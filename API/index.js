import express from "express";
import connectdb from "./db/connectDB.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const PORT = process.env.port || 4000;

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(PORT, () => {
  connectdb();
  console.log(`this is server is runing on port http://localhost:${PORT}`);
});
