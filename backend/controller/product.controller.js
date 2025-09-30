import Product from "../models/Product.model";
import mongoose from "mongoose";
// Function to get all the data
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error while getting all products", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// API to update the products from the database

export const UpdateProducts = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  // if(!mongoose.Types.ObjectId.isValid(id))
  // {
  //    res.status(404).json({success:false, message:"Invalid Product Id"})
  // }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "Invalid Product Id" });
  }
  try {
    const updateProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updateProduct });
  } catch (error) {
    console.log("Error while updating product", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// API to add the products into the database

export const addProduct = async (req, res) => {
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
};

// API to delete the product

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log("Error while deleting the product", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
  console.log("id", id);
};
