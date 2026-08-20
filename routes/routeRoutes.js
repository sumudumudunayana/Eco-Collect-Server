import express from "express";

import {
  getAllRoutes,
  getRouteById,
  createRoute,
  updateRoute,
  deleteRoute,
  getCollectorRoute,
  getLiveRoutes,
} from "../controllers/routeController.js";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

/* Citizen */

router.get(
  "/live",
  protect,
  authorizeRoles("citizen"),
  getLiveRoutes
);

/* Collector */

router.get(
  "/collector",
  protect,
  authorizeRoles("collector"),
  getCollectorRoute
);

/* Admin */

router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  getAllRoutes
);

router.get(
  "/:id",
  protect,
  authorizeRoles("admin"),
  getRouteById
);

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createRoute
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateRoute
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteRoute
);

export default router;