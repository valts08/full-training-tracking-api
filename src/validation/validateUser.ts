import z from 'zod';

const User = z.object({
    id: z.string().min(1),
    username: z.string().min(3)
})

export type UserType = z.infer<typeof User>
export default User