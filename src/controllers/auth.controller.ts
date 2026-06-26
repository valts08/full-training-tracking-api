import type { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service.ts";

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const requestObject = req.body

    await authService.registerUser(requestObject)

    return res.status(200).json({ message: "User successfully registered" })
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const requestObject = req.body

    await authService.loginUser(requestObject)

    return res.status(200).json({ message: "User successfully logged in" })
}

export default {
    registerUser,
    loginUser
}