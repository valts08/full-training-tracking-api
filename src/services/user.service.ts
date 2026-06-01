import zodValidation from '../helpers/validation/validateUser.ts'
import type { User } from "../helpers/validation/validateUser.ts";
import { prisma } from '../../prisma/prismaClient.ts';

const getUsers = async () => {
    const users = await prisma.user.findMany()
    return users
}

const createUser = async (data: User) => {
    const { username } = data
    
    if (!username) throw new Error("Error: user ID or username missing, check the request body")

    const usernameExists = await prisma.user.findFirst({
        where: { username }
    })

    if (usernameExists) throw new Error("User with that username already exists")

    const newUser = zodValidation.validateUser.parse(data)

    const user = await prisma.user.create({
        data: { ...newUser }
    })

    return user
}

const updateUser = async (data: User, passedUserId: number) => {

    const foundUser = await prisma.user.findFirst({
        where: { id: passedUserId }
    })

    if (!foundUser) throw new Error("The user you wanted to edit was not found")
        
    const validatedUser = zodValidation.validateUser.parse(data)

    const user = await prisma.user.update({
        where: { id: passedUserId },
        data: {
            ...validatedUser
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