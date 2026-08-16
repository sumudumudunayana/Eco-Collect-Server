import Report from "../models/Report.js";

/* ===================================
   ADMIN - GET ALL REPORTS
=================================== */

const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()

      .populate("citizen", "fullName phone")

      .populate("assignedCollector", "fullName");

    res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===================================
   CITIZEN - MY REPORTS
=================================== */

const getMyReports = async (req, res) => {
  try {
    const reports = await Report.find({
      citizen: req.user._id,
    })

      .populate("assignedCollector", "fullName phone")

      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===================================
   COLLECTOR - ASSIGNED REPORTS
=================================== */

const getAssignedReports = async (req, res) => {
  try {
    const reports = await Report.find({
      assignedCollector: req.user._id,
    })

      .populate("citizen", "fullName phone address");

    res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===================================
   GET REPORT BY ID
=================================== */

const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)

      .populate("citizen")

      .populate("assignedCollector");

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.status(200).json({
      success: true,
      report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===================================
   CREATE REPORT
=================================== */

const createReport = async (req, res) => {
  try {
    const report = await Report.create({
      ...req.body,

      citizen: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Report submitted successfully",
      report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===================================
   UPDATE REPORT (Admin)
=================================== */

const updateReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Report updated successfully",
      report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===================================
   UPDATE STATUS (Collector)
=================================== */

const updateReportStatus = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    report.status = req.body.status;

    await report.save();

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===================================
   DELETE REPORT
=================================== */

const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    await report.deleteOne();

    res.status(200).json({
      success: true,
      message: "Report deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  getAllReports,
  getMyReports,
  getAssignedReports,
  getReportById,
  createReport,
  updateReport,
  updateReportStatus,
  deleteReport,
};
