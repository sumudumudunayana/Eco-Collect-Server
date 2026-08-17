import Collection from "../models/Collection.js";

const getCitizenSchedule = async (req, res) => {
  try {
    const collections = await Collection.find({
      citizen: req.user._id,
    })

      .populate("collector", "fullName phone")

      .sort({
        collectionDate: 1,
      });

    const formattedCollections = collections.map((collection) => {
      const date = new Date(collection.collectionDate);
      const collector = collection.collector || {
        _id: null,
        fullName: "Assigned collector",
        phone: "",
      };

      return {
        id: collection._id,

        wasteType: collection.wasteType,

        collectionDate: date.toISOString().split("T")[0],

        day: date.toLocaleDateString("en-US", {
          weekday: "long",
        }),

        month: date.toLocaleDateString("en-US", {
          month: "long",
        }),

        collectionTime: collection.collectionTime,

        zone: collection.zone,

        address: collection.address,

        status: collection.status,

        notes: collection.notes,

        collector: {
          id: collector._id,

          name: collector.fullName,

          phone: collector.phone || "",
        },
      };
    });

    res.status(200).json({
      success: true,

      count: formattedCollections.length,

      collections: formattedCollections,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// GET /api/collections
const getAllCollections = async (req, res) => {
  try {
    const collections = await Collection.find()

      .populate("citizen", "fullName email phone")

      .populate("collector", "fullName phone")

      .sort({
        collectionDate: 1,
      });

    res.status(200).json({
      success: true,
      count: collections.length,
      collections,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/collections/:id
const getCollectionById = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id)

      .populate("citizen")

      .populate("collector");

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    res.status(200).json({
      success: true,
      collection,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// POST /api/collections
const createCollection = async (req, res) => {
  try {
    const collection = await Collection.create(req.body);

    res.status(201).json({
      success: true,
      message: "Collection created successfully",
      collection,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// PUT /api/collections/:id
const updateCollection = async (req, res) => {
  try {
    const collection = await Collection.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Collection updated successfully",
      collection,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE /api/collections/:id
const deleteCollection = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    await collection.deleteOne();

    res.status(200).json({
      success: true,
      message: "Collection deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/collections/collector
const getCollectorCollections = async (req, res) => {
  try {
    const collections = await Collection.find({
      collector: req.user._id,
    })

      .populate("citizen", "fullName phone address")

      .sort({
        collectionDate: 1,
      });

    res.status(200).json({
      success: true,
      count: collections.length,
      collections,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// PUT /api/collections/:id/status
// PUT /api/collections/:id/status
const updateCollectionStatus = async (req, res) => {
  try {
    const { status, reason } = req.body;

    const collection = await Collection.findById(req.params.id);

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    collection.status = status;

    if (reason) {
      collection.notes = reason;
    }

    await collection.save();

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      collection,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  getCitizenSchedule,
  getAllCollections,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection,
  getCollectorCollections,
  updateCollectionStatus,
};
