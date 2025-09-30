import express from "express";
import dontenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from './routes/product.route.js'
const app = express();

app.use(express.json()); //allow us to accept json data in the req.body
dontenv.config();

app.use("/api/products", productRoutes )

app.listen(1000, () => {
  connectDB();
  console.log("Server started at port http://localhost:1000");
});
