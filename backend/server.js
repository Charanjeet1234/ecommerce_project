import express from "express";
import dontenv from "dotenv";
import cors from 'cors';
import path from 'Path'

import { connectDB } from "./config/db.js";
import productRoutes from './routes/product.route.js'
const app = express();
const Port = process.env.PORT || 3000
app.use(express.json()); //allow us to accept json data in the req.body
dontenv.config();
app.use(cors()); // Allows all origins
const __dirname = path.resolve();
app.use("/api/products", productRoutes)


if(process.env.NODE_ENV === "production")
{
    app.use(express.static(path.join(__dirname, "/frontend/exommerce-project/dist")))
    app.get("*", (req, res) =>
    {
      res.sendFile(path.resolve(__dirname, "frontend", "ecommerce-project", "dist", "index.html"))
    })
}
app.listen(Port, () => {
  connectDB();
  console.log("Server started at port http://localhost:" + Port);
});
