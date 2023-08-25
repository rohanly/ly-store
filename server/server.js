import express from "express";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import "./loadEnv.js";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import connectDatabase from "./db/conn.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const PORT = process.env.PORT || 8080;
const app = express();
connectDatabase();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "dist")));

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/session", sessionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/product", productRoutes);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
