import express from "express";
import dontenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/Product.model.js";
const app = express();

app.use(express.json()) //allow us to accept json data in the req.body
dontenv.config();
app.post("/api/products", async (req, res) => {
  // res.send("Server is ready")
  const product = req.body; // request product data from the user
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all fields" });
  }
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log("Error while creating product", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
app.listen(1000, () => {
  connectDB();
  console.log("Server started at port http://localhost:1000");
});
