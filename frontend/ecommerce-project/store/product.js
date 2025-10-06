import { create } from "zustand";
import axios from "axios";
export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "FIll all fields" };
    }
    const res = await axios.post(
      "http://localhost:3000/api/products",
      newProduct,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    set((state) => ({ products: [...state.products, res.data] }));
    return { success: true, message: "Product added Successfully" };
  },
}));
