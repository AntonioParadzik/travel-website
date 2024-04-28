import express from "express";
import cors from "cors";

import {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.options("/new", cors()); // ADDED

router.get("/", getProducts);
router.post("/new", createProduct);
router.get("/product/:id", getProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
