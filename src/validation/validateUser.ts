import z from 'zod';

const createUser = z.object({
    id: z.string().min(1),
    username: z.string().min(3)
})

const updateUser = createUser.partial()

export type UserCreateType = z.infer<typeof createUser>
export type UserUpdateType = z.infer<typeof updateUser>

export default {
    createUser,
    updateUser
}