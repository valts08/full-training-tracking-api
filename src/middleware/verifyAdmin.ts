import type { Request, Response, NextFunction } from "express";
import { prisma } from "../../prisma/prismaClient.ts";
import AppError from "../helpers/appErrorClass.ts";

export const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) throw new AppError("Unauthenticated user", 401)

    const userId = req.user.id
    const userAdminCheck = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            isAdmin: true
        }
    })

    if (!userAdminCheck) throw new AppError("How did we get here?", 404)

    if (!userAdminCheck.isAdmin) throw new AppError("You aren't supposed to be here", 409)

    next();
}