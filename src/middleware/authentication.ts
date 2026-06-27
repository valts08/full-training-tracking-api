import type { Request, Response, NextFunction } from "express";
import AppError from "../helpers/appErrorClass.ts";
import { config } from "../config/index.ts";
import jwt from "jsonwebtoken";


export const authenticateRequest = async (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization?.split(' ')[1]

    if (!authToken) throw new AppError('No Authorization header received', 401)

    const isValidJWT = await jwt.verify(authToken, config.jwtSecret)

    if (!isValidJWT) throw new AppError('Invalid Auth token', 401)
    
    next();
}