import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./db/connectDb.js";
import dotenv from 'dotenv';
import authRouter from "./routes/auth.route.js";

dotenv.config();


const app = express();
const PORT=process.env.PORT || 5000;

app.use(cors({origin:"http://localhost:5173",credentials:true}))

app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.send("Health 100%");
});



app.use("/api/auth/",authRouter);


app.listen(PORT, () => {
  connectDB();
  console.log("server started at port:",PORT);
});
