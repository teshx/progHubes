import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { users } from "../model/Userschema.js";
import { generatTookenandsetcookies } from "../utills/generatewebtoken.js";

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

    const User = new users({
      username,
      email,
      password: hashedPassword,
    });

    await User.save();
    //jwt
    generatTookenandsetcookies(res, User._id);
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
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(404).send("all input is required");
    }
    const existEmail = await users.findOne({ email });
    if (!existEmail) {
      return res.status(404).send("email is not existing required");
    }
    const validPassword = await bcrypt.compare(password, existEmail.password);
    if (!validPassword) {
      return res.status(404).send("password is not valid required");
    }
    generatTookenandsetcookies(res, existEmail._id);
    res.status(201).json({
      success: true,
      message: "user is success fuly login",
      User: {
        ...existEmail._doc,
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

export const checkAuth = async (req, res) => {
  try {
    const user = await users.findById(req.user_id);
    res.status(200).json({
      success: true,
      message: "user is authenticated",
      User: {
        ...user._doc,
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
