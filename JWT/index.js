import express from "express";
import connectdb from "./db/connectDB.js";
import router from "./routes/auth.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const PORT = process.env.PORTs || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json()); //allow paree in comming requestes:req.body
app.use(cookieParser()); // it allow parse incoming cookies
app.use("/", router);
app.use(cors());
app.listen(PORT, () => {
  connectdb();
  console.log(`this is server is runing on port http://localhost:${PORT}`);
});
