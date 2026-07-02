import type { Request, Response, NextFunction } from "express";
import AppError from "../helpers/appErrorClass.ts";
import { config } from "../config/index.ts";
import jwt from "jsonwebtoken";


export const authenticateRequest = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authToken = req.headers.authorization?.split(' ')[1]
        if (!authToken) throw new AppError('No Authorization header received', 401)
        
        const decoded = jwt.verify(authToken, config.jwtSecret)
        
        if (typeof decoded === 'string' || !decoded.id || !decoded.email) {
            throw new AppError('Invalid Auth token', 401)
        }

        req.user = { id: decoded.id, email: decoded.email }
        next();
    } catch (err) {
        next(err);
    }
}