import "../config/index.ts";
import { prisma } from "../../prisma/prismaClient.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userService from "./user.service.ts";
import type { AuthUser } from "../helpers/validation/validateAuth.ts";
import zodAuthValidation from "../helpers/validation/validateAuth.ts";
import AppError from "../helpers/appErrorClass.ts";

const jwtSecret = process.env.JWT_SECRET ?? (() => {
    throw new Error("JWT_SECRET missing");
})();
// did it this way because when signing the JWT token, it expects the secret to be available. this is for typescript to know that an error will be thrown in the cases it isn't available

const registerUser = async (userObject: AuthUser) => {
    const validatedUserAuthObject = zodAuthValidation.validateAuth.parse(userObject)

    const { password, email, ...other } = validatedUserAuthObject

    const emailExists = await prisma.user.findUnique({ 
        where: { email }
    })

    if (emailExists) throw new AppError(`User with email ${email} already exists`, 409)

    const passwordHash = await bcrypt.hash(password, 10)

    const registeredUser = await userService.createUser({ passwordHash, email, ...other })

    return registeredUser
}

const loginUser = async (userObject: AuthUser) => {
    const validatedUserAuthObject = zodAuthValidation.validateAuth.parse(userObject)

    const { username, email, password } = validatedUserAuthObject

    const userHash = await prisma.user.findUnique({
        where: {
            email
        },
        select: {
            passwordHash: true
        }
    })

    if (!userHash) throw new AppError('Invalid credentials', 409)
    
    const correctPassword = await bcrypt.compare(password, userHash.passwordHash)

    if (!correctPassword) throw new AppError('Incorrect password, try again', 409)

    jwt.sign({ username, email }, jwtSecret, { expiresIn: 20 }, (err) => {
        console.log(err)
        if (err) throw new AppError('Invalid credentials', 401)
    })
}

export default {
    registerUser,
    loginUser
}