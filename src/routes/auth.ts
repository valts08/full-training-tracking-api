import { Router } from "express";
import { authLimiter } from "../middleware/rateLimiting.ts";
import authController from "../controllers/auth.controller.ts";

const router = Router()

router.post('/register', authLimiter, authController.registerUser)
router.post('/login', authLimiter, authController.loginUser)

export default router