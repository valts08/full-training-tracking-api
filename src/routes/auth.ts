import { Router } from "express";
import authController from "../controllers/auth.controller.ts";

const router = Router()

router.post('/register', authController.registerUser)

export default router