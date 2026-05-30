import zodValidation from '../validation/validateUser.ts'
import type { UserCreateType, UserUpdateType } from "../validation/validateUser.ts";
import { prisma } from '../../prisma/prismaClient.ts';

const getUsers = async () => {
    const users = await prisma.user.findMany()
    return users
}

const createUser = async (data: UserCreateType) => {
    const { username } = data
    
    if (!username) throw new Error("Error: user ID or username missing, check the request body")

    const usernameExists = await prisma.user.findFirst({
        where: { username }
    })

    if (usernameExists) throw new Error("User with that username already exists")

    const newUser = zodValidation.createUserNoId.parse(data)

    const user = await prisma.user.create({
        data: { ...newUser }
    })

    return user
}

const updateUser = (users: UserCreateType[] | UserUpdateType[], data: UserCreateType | UserUpdateType, passedUserId: number) => {

    const foundUser = users.findIndex(user => user.id === passedUserId)

    if (foundUser === -1) throw new Error("The user you wanted to edit was not found")

    const objectToValidate = {
        id: users[foundUser]?.id, 
        username: data.username
    }

    const zoddedUser = zodValidation.updateUser.parse(objectToValidate)

    return { foundUser, zoddedUser }
}

const deleteUsers = async () => {
    
}

export default {
    getUsers,
    createUser,
    updateUser,
    deleteUsers
}