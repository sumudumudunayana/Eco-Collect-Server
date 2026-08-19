import mongoose from "mongoose";

const truckSchema = new mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
    },

    driverName: {
      type: String,
      required: true,
    },

    collector: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    fuelType: {
      type: String,
      enum: ["Diesel", "Petrol", "Electric"],
      default: "Diesel",
    },

    currentLocation: {
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
      enum: [
        "Available",
        "On Route",
        "Maintenance",
      ],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

const Truck = mongoose.model("Truck", truckSchema);

export default Truck;