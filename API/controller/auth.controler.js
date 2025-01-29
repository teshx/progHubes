import { user } from "../models/userSchema.js";
import express from "express";
const router = express.Router();

import dotenv from "dotenv";
dotenv.configDotenv();

export const adduser = async (req, res) => {
  const { name, email } = req.body;

  try {
    if (!name || !email) {
      return res.status(404).send("all input is required");
    }
    const existEmail = await user.findOne({ email });
    if (existEmail) {
      return res.status(404).send("email is existing required");
    }
    const User = new user({
      name: name,
      email: email,
    });

    await User.save();
    res.status(201).json({
      ...User._doc,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
export const Allusers = async (req, res) => {
  
};

export const deleteuser = async (req, res) => {
   
};