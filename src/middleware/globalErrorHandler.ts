import type { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    let errors;
    if (err instanceof ZodError) {
            errors = err.issues.map(i => ({
            field: i.path.join(''),
            message: i.message
        }))

        return res.status(400).json({ errors })
    }

    return res.status(400).json({ error: err.message })
}

export default errorHandler