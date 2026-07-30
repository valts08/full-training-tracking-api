import z from 'zod';

const query = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).default(10),
    sortBy: z.optional(z.enum(["category", "laterality", "mechanics", "movementPattern", "name"])),
    order: z.enum(["asc", "desc"]).default("desc")
})

export type queryParamType = z.infer<typeof query>

export default {
    query
}