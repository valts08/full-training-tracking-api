import type { Request, Response, NextFunction } from 'express'
import AppError from '../helpers/appErrorClass.ts';
import { ZodError } from 'zod'
import { PrismaClientInitializationError, PrismaClientKnownRequestError } from '../generated/prisma/internal/prismaNamespace.ts';
import { PrismaClientValidationError } from '@prisma/client/runtime/client';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    let error;

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message })
    }

    if (err instanceof ZodError) {
            error = err.issues.map(i => ({
            field: i.path.join(''),
            message: i.message
        }))

        return res.status(400).json({ error })
    }

    if (err instanceof PrismaClientKnownRequestError) {
        error = {
            code: err.code,
            message: err.message,
            meta: err.meta
        }

        return res.status(400).json({ error })
    }

    if (err instanceof PrismaClientInitializationError) {
        error = {
            errorCode: err.errorCode,
            message: err.message
        }

        return res.status(400).json({ error })
    }

    if (err instanceof PrismaClientValidationError) {
        error = {
            error: err,
            message: err.message
        }
        
        return res.status(400).json({ error })
    }

    return res.status(400).json({ error: err, random: '123' })
}
    
export default errorHandler