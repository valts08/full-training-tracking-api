import type { Response, Request, NextFunction } from 'express'
import userService from '../services/user.service.ts'
import AppError from '../helpers/appErrorClass.ts'

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) throw new AppError("Unauthorized user", 401)
    
    const userId = req.user.id
    const users = await userService.getUser(userId)
    return res.status(200).json({ users })
}

const getAdminUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users = await userService.getAdminUsers()
    return res.status(200).json({ users })
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const userRequestBody = req.body
    const passedUserId = Number(req.params.id)
    
    const newUser = await userService.updateUser(userRequestBody, passedUserId)

    return res.status(200).json({ newUser, message: "User successfully updated" })
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) return res.status(400).json({ message: "Error: no body sent with request"})

    const userRequestBody = req.body

    const newUser = await userService.createUser(userRequestBody)

    return res.status(201).json({ newUser, message: "User successfully created" })
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.params.id)

    const deletedUser = await userService.deleteUser(userId)

    return res.status(200).json({ user: deletedUser, message: "User successfully deleted" })
}

export default {
    getUser,
    getAdminUsers,
    updateUser,
    createUser,
    deleteUser
}