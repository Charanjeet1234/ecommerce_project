import express from "express";
import dontenv from "dotenv";
import cors from 'cors';


import { connectDB } from "./config/db.js";
import productRoutes from './routes/product.route.js'
const app = express();
const Port = process.env.PORT || 3000
app.use(express.json()); //allow us to accept json data in the req.body
dontenv.config();
app.use(cors()); // Allows all origins
app.use("/api/products", productRoutes)

app.listen(Port, () => {
  connectDB();
  console.log("Server started at port http://localhost:" + Port);
});
