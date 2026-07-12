import { rateLimit } from "express-rate-limit";
import type { Request } from "express";

export const authLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 10,
    message: 'Auth rate limit reached',
    legacyHeaders: true,
    standardHeaders: 'draft-8',
    passOnStoreError: false,
    keyGenerator: (req: Request): string => {
        // using user IP as the identifier, later need to look into alternatives - user ID
        if (!req.ip) {
            console.warn('User IP value req.ip unknown, needs investigation')
            return 'unknown'
        }
        return req.ip
    },
    ipv6Subnet: 56,
})

export const writeLimiter = rateLimit({
    windowMs: 30 * 60 * 1000,
    limit: 20,
    message: 'Write limit reached',
    legacyHeaders: true,
    standardHeaders: 'draft-8',
    passOnStoreError: false,
    keyGenerator: (req: Request): string => {
        // using user IP as the identifier, later need to look into alternatives - user ID
        if (!req.ip) {
            console.warn('User IP value req.ip unknown, needs investigation')
            return 'unknown'
        }
        return req.ip
    },
    ipv6Subnet: 56,
})

export const readLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 10,
    message: 'Read limit reached',
    legacyHeaders: true,
    standardHeaders: 'draft-8',
    passOnStoreError: false,
    keyGenerator: (req: Request): string => {
        // using user IP as the identifier, later need to look into alternatives - user ID
        if (!req.ip) {
            console.warn('User IP value req.ip unknown, needs investigation')
            return 'unknown'
        }
        return req.ip
    },
    ipv6Subnet: 56,
})