import { create } from "zustand";
import axios from "axios";
const URL = "http://localhost:3000"
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
  
  fetchProducts: async () =>
    {
      const res = await axios.get("http://localhost:3000/api/products")
      set({products: res.data.data})
    },

    deleteProduct: async (pid) =>
    {
      const res = await axios.delete(`http://localhost:3000/api/products/${pid}`)
      // if(!res.success)
      // {
      //   return { success: false, message: res.message };
      // }
      set(state => ({products: state.products.filter(product => product._id !== product._pid)}))
      return { success: true, message: res.message };
    }
}));
