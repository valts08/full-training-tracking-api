import { config } from "../config/index.ts";
import { prisma } from "../../prisma/prismaClient.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userService from "./user.service.ts";
import type { AuthUser } from "../helpers/validation/validateAuth.ts";
import zodAuthValidation from "../helpers/validation/validateAuth.ts";
import AppError from "../helpers/appErrorClass.ts";

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

    const { email, password } = validatedUserAuthObject

    const user = await prisma.user.findUnique({
        where: {
            email
        },
        select: {
            passwordHash: true,
            id: true,
            email: true
        }
    })

    if (!user) throw new AppError('Invalid credentials', 409)
    
    const correctPassword = await bcrypt.compare(password, user.passwordHash)

    if (!correctPassword) throw new AppError('Incorrect credentials', 409)

    const jwtToken = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, { expiresIn: 300 })

    return jwtToken
}

export default {
    registerUser,
    loginUser
}