import User from "../models/User.js";
import Truck from "../models/Truck.js";
import Route from "../models/Route.js";
import Collection from "../models/Collection.js";
import Product from "../models/Product.js";
import Report from "../models/Report.js";

/* ===================================
   ADMIN DASHBOARD
=================================== */

const getDashboard = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments();

    const totalCitizens = await User.countDocuments({
      role: "citizen",
    });

    const totalCollectors = await User.countDocuments({
      role: "collector",
    });

    const totalTrucks = await Truck.countDocuments();

    const totalRoutes = await Route.countDocuments();

    const totalCollections = await Collection.countDocuments();

    const completedCollections =
      await Collection.countDocuments({
        status: "Completed",
      });

    const pendingCollections =
      await Collection.countDocuments({
        status: "Pending",
      });

    const missedCollections =
      await Collection.countDocuments({
        status: "Missed",
      });

    const totalReports = await Report.countDocuments();

    const pendingReports =
      await Report.countDocuments({
        status: "Pending",
      });

    const resolvedReports =
      await Report.countDocuments({
        status: "Resolved",
      });

    const totalProducts =
      await Product.countDocuments();

    const recentCollections =
      await Collection.find()
        .sort({
          createdAt: -1,
        })
        .limit(5)
        .populate("citizen", "fullName")
        .populate("collector", "fullName");

    res.status(200).json({

      success: true,

      statistics: {

        users: totalUsers,

        citizens: totalCitizens,

        collectors: totalCollectors,

        trucks: totalTrucks,

        routes: totalRoutes,

        collections: totalCollections,

        completedCollections,

        pendingCollections,

        missedCollections,

        reports: totalReports,

        pendingReports,

        resolvedReports,

        products: totalProducts,

      },

      recentCollections,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }
};




/* ===================================
   GET ALL USERS
=================================== */

const getUsers = async (req, res) => {
  try {

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




/* ===================================
   GET USER BY ID
=================================== */

const getUserById = async (req, res) => {
  try {

    const user = await User.findById(req.params.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




/* ===================================
   UPDATE USER
=================================== */

const updateUser = async (req, res) => {
  try {

    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};






/* ===================================
   DELETE USER
=================================== */

const deleteUser = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};





export {
  getDashboard,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};