import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()

export const PORT = process.env.PORT ?? 3000
export const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
    errorFormat: 'minimal',
    log: ['info'],
})
