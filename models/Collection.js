import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    citizen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    collector: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    wasteType: {
      type: String,
      enum: [
        "Organic Waste",
        "Recyclable Waste",
        "General Waste",
        "Electronic Waste",
      ],
      required: true,
    },

    collectionDate: {
      type: Date,
      required: true,
    },

    collectionTime: {
      type: String,
      required: true,
    },

    zone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      default: "",
    },
    location: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },

    status: {
      type: String,
      enum: ["Pending", "Completed", "Missed"],
      default: "Pending",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Collection = mongoose.model("Collection", collectionSchema);

export default Collection;
