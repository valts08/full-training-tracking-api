import z from "zod";

const validateAuth = z.object({
    username: z.string(),
    email: z.email(),
    password: z.string().min(8)
})

export type AuthUser = z.infer<typeof validateAuth>

export default {
    validateAuth
}