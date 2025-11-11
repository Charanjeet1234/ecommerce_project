import express from "express";
import dontenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

const app = express();
const Port = process.env.PORT || 3000;
app.use(express.json()); //allow us to accept json data in the req.body
dontenv.config();
app.use(cors()); // Allows all origins

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  const staticPath = path.join(
    __dirname,
    "..",
    "frontend",
    "ecommerce-project",
    "dist"
  );
  if (!fs.existsSync(staticPath)) {
    console.error(
      "❌ Vite build folder not found. Run `npm run build` in frontend!"
    );
  } else {
    app.use(express.static(staticPath));
    app.get("/*", (req, res) => {
      res.sendFile(path.join(staticPath, "index.html"));
    });
  }
}
app.listen(Port, () => {
  connectDB();
  console.log("Server started at http://localhost:" + Port);
});


