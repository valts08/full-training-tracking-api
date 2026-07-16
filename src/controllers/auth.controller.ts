import type { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service.ts";
import { emailValidator } from "../helpers/validation/controllerInputValidation.ts";
import AppError from "../helpers/appErrorClass.ts";

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, ...other } = req.body
    if (!emailValidator(email)) throw new AppError('Invalid email', 400)

    const requestObject = { email, ...other }

    await authService.registerUser(requestObject)

    return res.status(200).json({ message: "User successfully registered" })
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const requestObject = req.body

    const jwtToken = await authService.loginUser(requestObject)

    return res.status(200).json({ token: jwtToken, message: "User successfully logged in" })
}

export default {
    registerUser,
    loginUser
}