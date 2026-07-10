import zodValidation from '../helpers/validation/validateUser.ts'
import type { User } from "../helpers/validation/validateUser.ts";
import { prisma } from '../../prisma/prismaClient.ts';
import AppError from '../helpers/appErrorClass.ts';

const getUser = async (userId: number) => {
    const user = await prisma.user.findUnique({
        where: { id: userId}
    })
    
    return user
}

const getAdminUsers = async () => {
    const users = await prisma.user.findMany()
    return users
}

const createUser = async (data: User) => {
    const { username } = data
    
    if (!username) throw new AppError("Error: user ID or username missing, check the request body", 404)

    const usernameExists = await prisma.user.findFirst({
        where: { username }
    })

    // I think I'll remove these username checks completely, or change the logic here, since all requests go though auth service first
    // different emails but same username will make this fail - will need to change this
    if (usernameExists) throw new AppError("User with that username already exists", 404)

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

    if (!foundUser) throw new AppError("The user you wanted to edit was not found", 404)
        
    const validatedUser = zodValidation.validateUser.parse(data)

    const user = await prisma.user.update({
        where: { id: passedUserId },
        data: { ...validatedUser }
    })

    return user
}

const deleteUser = async (userId: number) => {
    
    const userToDelete = await prisma.user.findFirst({
        where: { id: userId }
    })

    if (!userToDelete) throw new AppError( "User Id not found", 404)

    const deletedUser = await prisma.user.delete({
        where: { id: userId }
    })

    return deletedUser
}



export default {
    getUser,
    getAdminUsers,
    createUser,
    updateUser,
    deleteUser
}