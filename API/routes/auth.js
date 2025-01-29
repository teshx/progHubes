import express from "express";
import { adduser, Allusers, deleteuser } from "../controller/auth.controler.js";
const router = express.Router();

router.get("/users", Allusers);
router.post("/users", adduser);
router.put("/delet/:id", deleteuser);

export default router;
