const mongoose = require("mongoose");

const parkingSiteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },

  totalSlots: { type: Number, default: 0 },
});

module.exports = mongoose.model("ParkingSite", parkingSiteSchema);
