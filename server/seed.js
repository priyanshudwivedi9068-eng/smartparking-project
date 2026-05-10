const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const ParkingSite = require("./models/ParkingSite");
const Slot = require("./models/Slot");

dotenv.config();
connectDB();

const sitesData = [
  {
    name: "Medanta Hospital",
    location: "Noida, Sector 62",
    image: "/assets/site_medanta.jpg",
    lat: 28.6258,
    lng: 77.3786,
  },
  {
    name: "Phoenix Palassio",
    location: "Gomti Nagar, Lucknow",
    image: "/assets/site_phoenix.jpg",
    lat: 26.8143,
    lng: 81.0116,
  },
  {
    name: "Changi Airport T4",
    location: "Singapore",
    image: "/assets/site_changi.jpg",
    lat: 1.3413,
    lng: 103.9881,
  },
];

const seedDatabase = async () => {
  try {
    try {
      await Slot.collection.drop();
    } catch (e) {}
    try {
      await ParkingSite.collection.drop();
    } catch (e) {}
    console.log("🧹 Old data and indexes cleared...");

    const allSlots = [];
    for (const siteInfo of sitesData) {
      const site = await ParkingSite.create(siteInfo);
      console.log(`Checking in: ${site.name}`);
      for (let floor = 1; floor <= 3; floor++) {
        for (let i = 1; i <= 10; i++) {
          let type = "Medium";
          if (i <= 2) type = "Small";
          if (i >= 9) type = "Large";
          const isPrem = floor === 1;

          allSlots.push({
            siteId: site._id,
            slotNumber: `${floor === 1 ? "A" : floor === 2 ? "B" : "C"}-${i}`,
            floor: floor,
            type: type,
            isOccupied: false,
            isPremium: isPrem,
            distanceFromEntry: floor * 100 + i,
          });
        }
      }
    }

    await Slot.insertMany(allSlots);
    console.log("✅ Created 3 Sites with 30 Slots each!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();
