import type { Request, Response, NextFunction } from 'express'
import AppError from '../helpers/appErrorClass.js';
import { ZodError } from 'zod'
import { PrismaClientInitializationError, PrismaClientKnownRequestError } from '../generated/prisma/internal/prismaNamespace.js';
import { PrismaClientValidationError } from '@prisma/client/runtime/client';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    let error;

    if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message })
    }

    if (err instanceof ZodError) {
            error = err.issues.map(i => ({
            field: i.path.join(''),
            message: i.message
        }))

        res.status(400).json({ error })
    }

    if (err instanceof PrismaClientKnownRequestError) {
        error = {
            code: err.code,
            message: err.message,
            meta: err.meta
        }

        res.status(400).json({ error })
    }

    if (err instanceof PrismaClientInitializationError) {
        error = {
            errorCode: err.errorCode,
            message: err.message
        }

        res.status(400).json({ error })
    }

    if (err instanceof PrismaClientValidationError) {
        error = {
            error: err,
            message: err.message
        }
        
        res.status(400).json({ error })
    }

    return console.error(err)

    // return res.status(400).json({ error: "something failed, check it out" })
}
    
export default errorHandler