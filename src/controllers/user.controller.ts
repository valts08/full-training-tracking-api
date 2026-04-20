import type { Response, Request, NextFunction } from 'express'
import userService from '../services/user.service.ts'
import users from '../data/userMock.ts'

const getUsers = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).send({ users, message: "User list successfully sent" })
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {

    const userRequestBody = req.body
    const passedUserId = req.params.id as string
    
    const { foundUser, zoddedUser } = await userService.updateUser(users, userRequestBody, passedUserId)

    users[foundUser] = zoddedUser

    return res.status(200).send({ user: users[foundUser], message: "User successfully updated" })
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) return res.status(400).json({ message: "Error: no body sent with request"})

    const userRequestBody = req.body

    const newUser = await userService.createUser(users, userRequestBody)

    users.push(newUser)

    return res.status(201).send({ users, message: "User successfully created" })
}

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id

    const userToDelete = users.findIndex(user => user.id === userId)

    if (userToDelete === -1) return res.status(404).json({ message: "User Id not found" })

    const deletedUser = users.splice(userToDelete, 1)

    return res.status(200).send({ user: deletedUser, message: "User successfully deleted" })
}

export default {
    getUsers,
    updateUser,
    createUser,
    deleteUser
}