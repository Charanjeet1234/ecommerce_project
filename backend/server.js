import express from "express";
import dontenv from "dotenv";
import cors from 'cors';
import path from 'path'
import { fileURLToPath } from "url";
import helmet from "helmet";


import { connectDB } from "./config/db.js";
import productRoutes from './routes/product.route.js'
const app = express();
const Port = process.env.PORT || 3000
app.use(express.json()); //allow us to accept json data in the req.body
dontenv.config();
app.use(cors()); // Allows all origins


// Set secure headers including CSP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],       // only allow same origin by default
        scriptSrc: ["'self'", "'unsafe-inline'"], // allow inline scripts if needed
        styleSrc: ["'self'", "'unsafe-inline'"],  // allow inline styles
        imgSrc: ["'self'", "data:", "blob:"],     // allow images from self, base64, blobs
        connectSrc: ["'self'", "http://localhost:3000"], // allow API requests to backend
        fontSrc: ["'self'", "https:", "data:"],
        objectSrc: ["'none'"],        // no <object> tags
        upgradeInsecureRequests: [],
      },
    },
  })
);


// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api/products", productRoutes)


if(process.env.NODE_ENV === "production")
{
    app.use(express.static(path.join(__dirname, "frontend/ecommerce-project/dist")))
    app.get("/*", (req, res) =>
    {
      res.sendFile(path.join(__dirname, "frontend", "ecommerce-project", "dist", "index.html"))
    })
}
app.listen(Port, () => {
  connectDB();
  console.log("Server started at http://localhost:" + Port);
});
