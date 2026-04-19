import zodValidation from '../validation/validateUser.ts'
import type { UserCreateType, UserUpdateType } from "../validation/validateUser.ts";

const createUser = (users: UserCreateType[] | UserUpdateType[], data: any) => {
    const { id, username } = data
    
    if (!id || !username) throw new Error("Error: user ID or username missing, check the request body") // will replace later with Zod validation

    users.forEach(user => {
        if (user.id === id || user.username === username) { // change later just to a username check, id should be checked separately since it should be set at create time
            throw new Error("User with that ID or username already exists")
        }
    })

    const zoddedUser = zodValidation.createUser.parse(data)

    return zoddedUser
}

const updateUser = (users: UserCreateType[] | UserUpdateType[], data: any) => {
    const userId = data.params.id as string
    const { username } = data.body

    const foundUser = users.findIndex(user => user.id === userId)

    if (foundUser === -1) throw new Error("The user you wanted to edit was not found")

    const objectToValidate = {
        id: users[foundUser]?.id, 
        username
    }

    const zoddedUser = zodValidation.updateUser.parse(objectToValidate)

    return { foundUser, zoddedUser }
}

export default {
    createUser,
    updateUser
}