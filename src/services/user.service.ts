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

const updateUser = async (data: UserUpdateType, passedUserId: number) => {

    const foundUser = await prisma.user.findFirst({
        where: { id: passedUserId }
    })

    if (!foundUser) throw new Error("The user you wanted to edit was not found")
        
    const validatedUser = zodValidation.updateUser.parse(data)

    const user = await prisma.user.update({
        where: { id: passedUserId },
        update: {
            ...data
        }
    })

    return user
}

const deleteUser = async (userId: number) => {
    
    const userToDelete = await prisma.user.findFirst({
        where: { id: userId }
    })

    if (!userToDelete) throw new Error( "User Id not found")

    const deletedUser = await prisma.user.delete({
        where: { id: userId }
    })

    return deletedUser
}

export default {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}