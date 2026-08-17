import Route from "../models/Route.js";

/* ===================================
   GET ALL ROUTES (Admin)
=================================== */

const getAllRoutes = async (req, res) => {
  try {

    const routes = await Route.find()

      .populate("truck", "vehicleNumber")

      .populate("collector", "fullName phone");

    res.status(200).json({
      success: true,
      count: routes.length,
      routes,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ===================================
   GET ROUTE BY ID
=================================== */

const getRouteById = async (req, res) => {
  try {

    const route = await Route.findById(req.params.id)

      .populate("truck")

      .populate("collector");

    if (!route) {
      return res.status(404).json({
        success: false,
        message: "Route not found",
      });
    }

    res.status(200).json({
      success: true,
      route,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ===================================
   CREATE ROUTE
=================================== */

const createRoute = async (req, res) => {
  try {

    const route = await Route.create(req.body);

    res.status(201).json({
      success: true,
      message: "Route created successfully",
      route,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ===================================
   UPDATE ROUTE
=================================== */

const updateRoute = async (req, res) => {
  try {

    const route = await Route.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!route) {
      return res.status(404).json({
        success: false,
        message: "Route not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Route updated successfully",
      route,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ===================================
   DELETE ROUTE
=================================== */

const deleteRoute = async (req, res) => {
  try {

    const route = await Route.findById(req.params.id);

    if (!route) {
      return res.status(404).json({
        success: false,
        message: "Route not found",
      });
    }

    await route.deleteOne();

    res.status(200).json({
      success: true,
      message: "Route deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ===================================
   COLLECTOR'S ROUTE
=================================== */

const getCollectorRoute = async (req, res) => {
  try {

    const route = await Route.findOne({
      collector: req.user._id,
      status: {
        $ne: "Completed",
      },
    })

      .populate("truck", "vehicleNumber status");

    if (!route) {
      return res.status(404).json({
        success: false,
        message: "No active route found",
      });
    }

    res.status(200).json({
      success: true,
      route,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ===================================
   LIVE ROUTES
=================================== */

const getLiveRoutes = async (req, res) => {
  try {

    const routes = await Route.find({
      status: "In Progress",
    })

      .populate("truck", "vehicleNumber")

      .populate("collector", "fullName");

    res.status(200).json({
      success: true,
      count: routes.length,
      routes,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export {
  getAllRoutes,
  getRouteById,
  createRoute,
  updateRoute,
  deleteRoute,
  getCollectorRoute,
  getLiveRoutes,
};