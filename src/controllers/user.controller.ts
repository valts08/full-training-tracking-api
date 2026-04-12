import type { Response, Request, NextFunction } from 'express' 

const users = [
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

const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id as string
    const { username } = req.body

    const foundUser = users.findIndex(user => user.id === userId)
    console.log(foundUser)

    if (foundUser === -1) res.status(404).json({ message: "The user you wanted to edit was not found" })

    users[foundUser] = {
        id: userId, 
        username
    }

    res.status(200).send({ user: users[foundUser], message: "User successfully updated" })
}

const createUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) throw new Error("Error: no body sent with request")

    const { id, username } = req.body 

    if (!id || !username) throw new Error("Error: user ID or username missing, check the request body") // will replace later with Zod validation

    users.forEach(user => {
        if (user.id === id || user.username === username) { // change later just to a username check, id should be checked separately since it should be set at create time
            res.status(409).json({ message: "User with that ID or username already exists" })
        }
    })

    users.push({ id, username })

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