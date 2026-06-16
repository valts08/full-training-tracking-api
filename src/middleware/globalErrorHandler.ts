import type { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { PrismaClientInitializationError, PrismaClientKnownRequestError } from '../generated/prisma/internal/prismaNamespace.ts';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    let error;
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

    return res.status(400).json({ error: err.message })
}

export default errorHandler