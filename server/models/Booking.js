const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    vehicleNumber: { type: String, required: true },
    vehicleType: { type: String, required: true },
    slotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Slot",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isPremium: { type: Boolean, default: false },

    entryTime: { type: Date, default: Date.now },
    exitTime: { type: Date },

    totalAmount: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["Active", "Completed", "Cancelled"],
      default: "Active",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", bookingSchema);
