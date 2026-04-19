import type { Response, Request, NextFunction } from 'express'
import User from '../validation/validateUser.ts'
import type { UserCreateType, UserUpdateType } from '../validation/validateUser.ts'
import userService from '../services/user.service.ts'

const users: UserCreateType[] | UserUpdateType[] = [
    {
        id: '1',
        username: 'a'
    },
    {
        id: '2',
        username: 'b'
    },
    {
        id: '3',
        username: 'c'
    },
    {
        id: '4',
        username: 'd'
    }
]

const getUsers = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ users, message: "User list successfully sent" })
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    
    const { foundUser, zoddedUser } = await userService.updateUser(users, req)

    users[foundUser] = zoddedUser

    res.status(200).send({ user: users[foundUser], message: "User successfully updated" })
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) res.status(400).json({ message: "Error: no body sent with request"})

    const newUser = await userService.createUser(users, req.body)

    users.push(newUser)

    res.status(200).send({ users, message: "User successfully created" })
}

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id

    const userToDelete = users.findIndex(user => user.id === userId)

    if (userToDelete === -1) res.status(404).json({ message: "User Id not found" })

    const deletedUser = users.splice(userToDelete, 1)

    res.status(200).send({ user: deletedUser, message: "User successfully deleted" })
}

export default {
    getUsers,
    updateUser,
    createUser,
    deleteUser
}