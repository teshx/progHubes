import express from "express";
import { checkAuth, signup, login } from "../controllers/auth.controller.js";
const router = express.Router();

router.get("/signp", signup);
router.get("/login", login);
router.get("/check-auth", checkAuth);

export default router;
