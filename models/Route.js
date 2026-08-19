import mongoose from "mongoose";

const routeSchema = new mongoose.Schema(
  {
    routeName: {
      type: String,
      required: true,
      unique: true,
    },

    area: {
      type: String,
      required: true,
    },

    truck: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Truck",
      required: true,
    },

    collector: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    totalStops: {
      type: Number,
      default: 0,
    },

    completedStops: {
      type: Number,
      default: 0,
    },

    estimatedTime: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "In Progress",
        "Completed",
      ],
      default: "Pending",
    },

    stops: [
      {
        address: String,
        latitude: Number,
        longitude: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Route = mongoose.model("Route", routeSchema);

export default Route;