const express = require("express");
const router = express.Router();
const {
  getSlots,
  bookSlot,
  endBooking,
  searchSites,
  getHistory,
  getSiteDetails,
} = require("../controllers/parkingController");
router.get("/sites", searchSites);
router.get("/site/:siteId", getSiteDetails);
router.get("/slots/:siteId", getSlots);

router.post("/book", bookSlot);
router.post("/exit", endBooking);
router.get("/history", getHistory);

module.exports = router;
