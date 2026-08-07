import type { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service.ts";
import { emailValidator } from "../helpers/validation/controllerInputValidation.ts";
import zodAuthValidation from '../helpers/validation/validateAuth.ts'
import AppError from "../helpers/appErrorClass.ts";

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, ...other } = req.body
    if (!emailValidator(email)) throw new AppError('Invalid email', 400)

    const validAuthObject = zodAuthValidation.validateAuth.parse({ email, ...other })

    await authService.registerUser(validAuthObject)

    return res.status(200).json({ message: "User successfully registered" })
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const validAuthObject = zodAuthValidation.validateAuth.parse(req.body)

    const jwtToken = await authService.loginUser(validAuthObject)

    return res.status(200).json({ token: jwtToken, message: "User successfully logged in" })
}

export default {
    registerUser,
    loginUser
}