import Truck from "../models/Truck.js";

// GET /api/trucks
const getAllTrucks = async (req, res) => {
  try {

    const trucks = await Truck.find()
      .populate("collector", "fullName phone");

    res.status(200).json({
      success: true,
      count: trucks.length,
      trucks,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// GET /api/trucks/:id
const getTruckById = async (req, res) => {
  try {

    const truck = await Truck.findById(req.params.id)
      .populate("collector", "fullName phone");

    if (!truck) {
      return res.status(404).json({
        success: false,
        message: "Truck not found",
      });
    }

    res.status(200).json({
      success: true,
      truck,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// POST /api/trucks
const createTruck = async (req, res) => {
  try {

    const truck = await Truck.create(req.body);

    res.status(201).json({
      success: true,
      message: "Truck created successfully",
      truck,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// PUT /api/trucks/:id
const updateTruck = async (req, res) => {
  try {

    const truck = await Truck.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!truck) {
      return res.status(404).json({
        success: false,
        message: "Truck not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Truck updated successfully",
      truck,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// DELETE /api/trucks/:id
const deleteTruck = async (req, res) => {
  try {

    const truck = await Truck.findById(req.params.id);

    if (!truck) {
      return res.status(404).json({
        success: false,
        message: "Truck not found",
      });
    }

    await truck.deleteOne();

    res.status(200).json({
      success: true,
      message: "Truck deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// PUT /api/trucks/:id/location
const updateTruckLocation = async (req, res) => {
  try {

    const { latitude, longitude } = req.body;

    const truck = await Truck.findById(req.params.id);

    if (!truck) {
      return res.status(404).json({
        success: false,
        message: "Truck not found",
      });
    }

    truck.currentLocation = {
      latitude,
      longitude,
    };

    await truck.save();

    res.status(200).json({
      success: true,
      message: "Location updated successfully",
      truck,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// GET /api/trucks/live
const getLiveTruckLocations = async (req, res) => {
  try {

    const trucks = await Truck.find({
      status: "On Route",
    }).select(
      "vehicleNumber currentLocation status"
    );

    res.status(200).json({
      success: true,
      trucks,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export {
  getAllTrucks,
  getTruckById,
  createTruck,
  updateTruck,
  deleteTruck,
  updateTruckLocation,
  getLiveTruckLocations,
};