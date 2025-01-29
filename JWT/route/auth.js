import express from "express";
import { checkAuth, signup, login } from "../controllers/auth.controller.js";
import dotenv from "dotenv";
dotenv.config();
import { verifyToken } from "./../middleware/verifywebtoken.js";
const router = express.Router();

router.post("/signup", signup);
router.get("/login", login);
router.get("/check-auth", verifyToken, checkAuth);

export default router;
