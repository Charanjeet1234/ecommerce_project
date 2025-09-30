import express from "express";
const router = express.Router();
import { getAllProducts, UpdateProducts, addProduct , deleteProduct} from "../controller/product.controller.js";
// API to get all the data frome the database
router.get("/", getAllProducts );
// API to update the products from the database
router.put("/:id", UpdateProducts );

// API to add the products into the database
router.post("/", addProduct );

// API to delete the product 
router.delete("/:id", deleteProduct );

export default router;
