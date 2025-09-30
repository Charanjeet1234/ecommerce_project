import express from "express";
import dontenv from "dotenv"
import { connectDB } from "./config/db.js";
const app = express();

dontenv.config()
app.get("/products", (req, res)=>
{
    res.send("Server is ready")
})
app.listen(1000, ()=>
{
    connectDB()
    console.log("Server started at port http://localhost:1000")
})

