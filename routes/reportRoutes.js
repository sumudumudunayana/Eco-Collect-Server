import express from "express";

import {
  getAllReports,
  getMyReports,
  getAssignedReports,
  getReportById,
  createReport,
  updateReport,
  updateReportStatus,
  deleteReport,
} from "../controllers/reportController.js";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

/* ==========================================
   Citizen Routes
========================================== */

// View own reports
router.get("/my", protect, authorizeRoles("citizen"), getMyReports);

// Create new report
router.post("/", protect, authorizeRoles("citizen"), createReport);

/* ==========================================
   Collector Routes
========================================== */

// View assigned reports
router.get(
  "/assigned",
  protect,
  authorizeRoles("collector"),
  getAssignedReports,
);

// Update report status
router.put(
  "/:id/status",
  protect,
  authorizeRoles("collector"),
  updateReportStatus,
);

/* ==========================================
   Admin Routes
========================================== */

// View all reports
router.get("/", protect, authorizeRoles("admin"), getAllReports);

// View single report
router.get("/:id", protect, authorizeRoles("admin"), getReportById);

// Update report
router.put("/:id", protect, authorizeRoles("admin"), updateReport);

// Delete report
router.delete("/:id", protect, authorizeRoles("admin"), deleteReport);

export default router;
