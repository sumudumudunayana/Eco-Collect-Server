import express from "express";

import {
  getCollectorDashboard,
  getDailySummary,
} from "../controllers/collectorController.js";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  authorizeRoles("collector"),
  getCollectorDashboard
);

router.get(
  "/daily-summary",
  protect,
  authorizeRoles("collector"),
  getDailySummary
);

export default router;