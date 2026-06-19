import { prisma } from "../../prisma/prismaClient.ts";
import bcrypt from "bcrypt";
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

export default {
    registerUser
}