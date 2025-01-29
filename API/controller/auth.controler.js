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
  try {
    const users = await user.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteuser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await user.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).send("User not found");
    }

    res.status(200).json({
      message: `User with ID ${id} deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
