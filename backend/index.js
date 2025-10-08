import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { connectDB } from "./config/connectDB.js";

import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000
const __dirname = path.resolve();

app.use(cors({ origin: "http://localhost:5173", credentials: true }))

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get('/{*any}', (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend" ,"dist", "index.html"));
    });
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server running on Port: ", PORT)
    });
});