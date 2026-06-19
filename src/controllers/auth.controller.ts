import type { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service.ts";

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const requestObject = req.body

    await authService.registerUser(requestObject)

    return res.status(200).json({ message: "User successfully registered" })
}

export default {
    registerUser
}