import express from "express";
import dontenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/Product.model.js";
const app = express();

app.use(express.json()); //allow us to accept json data in the req.body
dontenv.config();

// API to get all the data frome the database
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error while getting all products", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// API to update the products from the database
app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  try {
    const updateProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updateProduct });
  } catch (error) {
    console.log("Error while updating product", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// API to add the products into the database
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

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log("Error while deleting the product", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
  console.log("id", id);
});

app.listen(1000, () => {
  connectDB();
  console.log("Server started at port http://localhost:1000");
});
