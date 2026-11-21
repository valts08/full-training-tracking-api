import type { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service.js";
import { emailValidator } from "../helpers/validation/controllerInputValidation.js";
import zodAuthValidation from '../helpers/validation/validateAuth.js'
import AppError from "../helpers/appErrorClass.js";

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, ...other } = req.body
    if (!emailValidator(email)) throw new AppError('Invalid email', 400)

    const validAuthObject = zodAuthValidation.validateAuth.parse({ email, ...other })

    await authService.registerUser(validAuthObject)

    return res.status(200).json({ message: "User successfully registered" })
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    let validAuthObject;
    let jwtToken;

    try {
        validAuthObject = zodAuthValidation.validateAuth.parse(req.body)
        jwtToken = await authService.loginUser(validAuthObject)
    } catch (e) {
        console.error(e)
        next(e)
    }

    return res.status(200).json({ token: jwtToken, message: "User successfully logged in" })
}

export default {
    registerUser,
    loginUser
}