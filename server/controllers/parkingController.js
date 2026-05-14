const Slot = require("../models/Slot");
const ParkingSite = require("../models/ParkingSite");
const Booking = require("../models/Booking");
exports.searchSites = async (req, res) => {
  const { query } = req.query;
  try {
    const sites = await ParkingSite.find({
      name: { $regex: query, $options: "i" },
    });
    res.json(sites);
  } catch (error) {
    res.status(500).json({ message: "Search failed" });
  }
};
exports.getSlots = async (req, res) => {
  const { siteId } = req.params;
  try {
    const slots = await Slot.find({ siteId }).sort({ slotNumber: 1 });
    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
exports.bookSlot = async (req, res) => {
  const { vehicleNumber, vehicleType, isVip, siteId } = req.body;

  try {
    const nearestSlot = await Slot.findOne({
      siteId: siteId,
      type: vehicleType,
      isOccupied: false,
      isPremium: isVip ? true : false,
    }).sort({ distanceFromEntry: 1 });

    if (!nearestSlot) {
      return res
        .status(404)
        .json({ success: false, message: "Parking Full here!" });
    }

    nearestSlot.isOccupied = true;
    nearestSlot.vehicleNumber = vehicleNumber;
    nearestSlot.vehicleType = vehicleType;
    nearestSlot.entryTime = new Date();
    await nearestSlot.save();

    const newBooking = await Booking.create({
      vehicleNumber,
      vehicleType,
      slotId: nearestSlot._id,
      isPremium: isVip,
      entryTime: nearestSlot.entryTime,
      status: "Active",
    });

    res
      .status(201)
      .json({ success: true, slot: nearestSlot, ticket: newBooking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const endBooking = async (req, res) => {
  const { slotId, paymentMethod } = req.body;

  try {
    const slot = await Slot.findById(slotId);
    if (!slot) {
      return res.status(404).json({ success: false, message: "Slot not found" });
    }

    const booking = await Booking.findOne({
      slotId: slotId,
      status: "Active",
    });

    if (!booking) {
      return res.status(404).json({ success: false, message: "No active booking found for this slot" });
    }

    const exitTime = new Date();
    const diffInMs = exitTime - booking.entryTime;
    const totalMinutes = Math.floor(diffInMs / (1000 * 60));
    const billableHours = Math.max(1, Math.ceil(totalMinutes / 60));
    const rate = slot.isPremium ? 25 : 10;
    const totalAmount = billableHours * rate;

    booking.status = "Completed";
    booking.exitTime = exitTime;
    booking.totalAmount = totalAmount;
    booking.paymentMethod = paymentMethod || "Unknown";
    await booking.save();

    slot.isOccupied = false;
    slot.vehicleNumber = null;
    slot.vehicleType = null;
    slot.entryTime = null;
    await slot.save();

    res.json({ success: true, message: "Payment successful and slot freed", booking });
  } catch (error) {
    console.error("End Booking Error:", error);
    res.status(500).json({ success: false, message: "Server error during checkout" });
  }
};

exports.endBooking = endBooking;
exports.getSiteDetails = async (req, res) => {
  try {
    const site = await ParkingSite.findById(req.params.siteId);
    res.json(site);
  } catch (error) {
    res.status(500).json({ message: "Site not found" });
  }
};
exports.searchSites = async (req, res) => {
  const query = req.query.query || "";
  try {
    const sites = await ParkingSite.find({
      name: { $regex: query, $options: "i" },
    });
    res.json(sites);
  } catch (error) {
    res.status(500).json({ message: "Search failed" });
  }
};
exports.bookSlot = async (req, res) => {
  const { userId, vehicleNumber, vehicleType, isVip, siteId } = req.body;

  try {
    const nearestSlot = await Slot.findOne({
      siteId: siteId,
      type: vehicleType,
      isOccupied: false,
      isPremium: isVip ? true : false,
    }).sort({ distanceFromEntry: 1 });
    if (!nearestSlot) {
      return res
        .status(404)
        .json({ success: false, message: "Parking Full here!" });
    }
    nearestSlot.isOccupied = true;
    nearestSlot.vehicleNumber = vehicleNumber;
    nearestSlot.vehicleType = vehicleType;
    nearestSlot.entryTime = new Date();
    await nearestSlot.save();
    const newBooking = await Booking.create({
      userId: userId || null,
      vehicleNumber,
      vehicleType,
      slotId: nearestSlot._id,
      isPremium: isVip,
      entryTime: nearestSlot.entryTime,
      status: "Active",
    });

    res
      .status(201)
      .json({ success: true, slot: nearestSlot, ticket: newBooking });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: error.message });
  }
};
exports.getHistory = async (req, res) => {
  const { userId } = req.query;

  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const history = await Booking.find({ userId })
      .populate({
        path: "slotId",
        populate: {
          path: "siteId",
          model: "ParkingSite",
          select: "name location",
        },
      })
      .sort({ createdAt: -1 });
    res.json({ success: true, data: history });
  } catch (error) {
    console.error("History Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch history" });
  }
};
