import type { Request, Response, NextFunction } from 'express'

const unknownRouteHandler = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: `Couldn't find a route that matches path: ${req.path} ` })
}

export default unknownRouteHandler