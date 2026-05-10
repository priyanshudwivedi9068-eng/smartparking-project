const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  siteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ParkingSite",
    required: true,
  },

  slotNumber: { type: String, required: true },
  type: { type: String, enum: ["Small", "Medium", "Large"], required: true },
  floor: { type: Number, required: true },
  distanceFromEntry: { type: Number, required: true },
  isPremium: { type: Boolean, default: false },
  isOccupied: { type: Boolean, default: false },
  vehicleNumber: { type: String, default: null },
  vehicleType: { type: String, default: null },
  entryTime: { type: Date, default: null },
});
slotSchema.index({ siteId: 1, slotNumber: 1 }, { unique: true });

module.exports = mongoose.model("Slot", slotSchema);
