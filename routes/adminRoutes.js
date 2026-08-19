import express from "express";

import {
  getDashboard,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/adminController.js";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

/* Dashboard */

router.get(
  "/dashboard",
  protect,
  authorizeRoles("admin"),
  getDashboard
);

/* User Management */

router.get(
  "/users",
  protect,
  authorizeRoles("admin"),
  getUsers
);

router.get(
  "/users/:id",
  protect,
  authorizeRoles("admin"),
  getUserById
);

router.put(
  "/users/:id",
  protect,
  authorizeRoles("admin"),
  updateUser
);

router.delete(
  "/users/:id",
  protect,
  authorizeRoles("admin"),
  deleteUser
);

export default router;