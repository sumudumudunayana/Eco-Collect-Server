import express from "express";

import {
  getProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

/* Public Routes */

router.get("/", getProducts);

router.get("/search", searchProducts);

router.get("/category/:category", getProductsByCategory);

router.get("/:id", getProductById);

/* Admin Routes */

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createProduct
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateProduct
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteProduct
);

export default router;