import { PrismaClient } from "../src/generated/prisma/client.js"
import { PrismaPg } from '@prisma/adapter-pg'

export const prisma = new PrismaClient({
    errorFormat: "pretty",
    adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL
    })
})