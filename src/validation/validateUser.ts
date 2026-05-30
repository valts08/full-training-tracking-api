import z from 'zod';

const createUser = z.object({
    id: z.number(),
    username: z.string().min(3)
})
const createUserNoId = createUser.omit({ id: true})

const updateUser = createUser.partial()
const updateUserNoId = updateUser.omit({ id: true})

export type UserCreateType = z.infer<typeof createUser>
export type UserUpdateType = z.infer<typeof updateUser>

export default {
    createUser,
    createUserNoId,
    updateUser,
    updateUserNoId
}