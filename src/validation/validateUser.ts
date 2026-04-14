import z from 'zod';

const createUser = z.object({
    id: z.string().min(1),
    username: z.string().min(3)
})

export default {
    createUser,
    updateUser: createUser.partial()
}