import z from 'zod';

const validateUser = z.object({
    username: z.string().min(3),
    passwordHash: z.string().min(60),
    email: z.email()
})

export type User = z.infer<typeof validateUser>

export default {
    validateUser
}