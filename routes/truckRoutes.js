import express from "express";

import {
  getAllTrucks,
  getTruckById,
  createTruck,
  updateTruck,
  deleteTruck,
  updateTruckLocation,
  getLiveTruckLocations,
} from "../controllers/truckController.js";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

/* ==================================
   Citizen Routes
================================== */

router.get(
  "/live",
  protect,
  authorizeRoles("citizen"),
  getLiveTruckLocations
);

/* ==================================
   Collector Routes
================================== */

router.put(
  "/:id/location",
  protect,
  authorizeRoles("collector"),
  updateTruckLocation
);

/* ==================================
   Admin Routes
================================== */

router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  getAllTrucks
);

router.get(
  "/:id",
  protect,
  authorizeRoles("admin"),
  getTruckById
);

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createTruck
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateTruck
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteTruck
);

export default router;