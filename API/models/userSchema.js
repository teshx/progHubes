import { types } from "mime-types";
import mongoose from "mongoose";

const userscema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const user = mongoose.model("user", userscema);
