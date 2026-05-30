import z from 'zod';

const validateUser = z.object({
    username: z.string().min(3)
})

export type User = z.infer<typeof validateUser>

export default {
    validateUser
}