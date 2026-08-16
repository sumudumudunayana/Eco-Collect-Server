import Collection from "../models/Collection.js";
import Route from "../models/Route.js";
import Report from "../models/Report.js";

/* ===================================
   COLLECTOR DASHBOARD
=================================== */

const getCollectorDashboard = async (req, res) => {
  try {

    const collectorId = req.user._id;

    const assignedCollections = await Collection.countDocuments({
      collector: collectorId,
    });

    const completedCollections = await Collection.countDocuments({
      collector: collectorId,
      status: "Completed",
    });

    const pendingCollections = await Collection.countDocuments({
      collector: collectorId,
      status: "Pending",
    });

    const missedCollections = await Collection.countDocuments({
      collector: collectorId,
      status: "Missed",
    });

    const assignedReports = await Report.countDocuments({
      assignedCollector: collectorId,
    });

    const resolvedReports = await Report.countDocuments({
      assignedCollector: collectorId,
      status: "Resolved",
    });

    const todayRoute = await Route.findOne({
      collector: collectorId,
      status: {
        $ne: "Completed",
      },
    }).populate("truck", "vehicleNumber");

    res.status(200).json({
      success: true,

      summary: {

        assignedCollections,

        completedCollections,

        pendingCollections,

        missedCollections,

        assignedReports,

        resolvedReports,

      },

      todayRoute,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }
};

/* ===================================
   DAILY SUMMARY
=================================== */

const getDailySummary = async (req, res) => {

  try {

    const collectorId = req.user._id;

    const collections = await Collection.find({
      collector: collectorId,
    });

    const reports = await Report.find({
      assignedCollector: collectorId,
    });

    res.status(200).json({

      success: true,

      totalCollections: collections.length,

      completedCollections: collections.filter(
        c => c.status === "Completed"
      ).length,

      pendingCollections: collections.filter(
        c => c.status === "Pending"
      ).length,

      missedCollections: collections.filter(
        c => c.status === "Missed"
      ).length,

      assignedReports: reports.length,

      resolvedReports: reports.filter(
        r => r.status === "Resolved"
      ).length,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

export {
  getCollectorDashboard,
  getDailySummary,
};