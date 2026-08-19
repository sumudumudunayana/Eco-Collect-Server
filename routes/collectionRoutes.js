import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

import {
  getCitizenSchedule,
  getAllCollections,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection,
  getCollectorCollections,
  updateCollectionStatus,
} from "../controllers/collectionController.js";

const router = express.Router();

/* ================================
   Citizen Routes
================================ */

router.get(
  "/schedule",
  protect,
  authorizeRoles("citizen"),
  getCitizenSchedule
);

router.get(
  "/my-schedule",
  protect,
  authorizeRoles("citizen"),
  getCitizenSchedule
);

/* ================================
   Collector Routes
================================ */

router.get(
  "/collector",
  protect,
  authorizeRoles("collector"),
  getCollectorCollections
);

router.put(
  "/:id/status",
  protect,
  authorizeRoles("collector"),
  updateCollectionStatus
);

/* ================================
   Admin Routes
================================ */

router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  getAllCollections
);

router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "collector"),
  getCollectionById
);

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createCollection
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateCollection
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteCollection
);

export default router;