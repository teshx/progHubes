import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { users } from "../model/Userschema.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(404).send("all input is required");
    }
    const existEmail = await users.findOne({ email });
    if (existEmail) {
      return res.status(404).send("email is existing required");
    }

    const existUsername = await users.findOne({ username });
    if (existUsername) {
      return res.status(404).send("exist Username is existing required");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //verificatiionToken

    const User = new users({
      email,
      password: hashedPassword,
      username,
      verificationToken,
      verificationExpires: Date.now() + 24 * 60 * 60 * 1000, // 24 houres
    });

    await User.save();
    //jwt

    res.status(201).json({
      success: true,
      message: "user is success fuly created",
      User: {
        ...User._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};





export const login = async (req, res) => {
 
};



export const checkAuth = async (req, res) => {};
