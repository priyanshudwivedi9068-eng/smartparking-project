import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaCheckCircle,
  FaCrown,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaRoute,
} from "react-icons/fa";

const ParkingDashboard = () => {
  const { siteId } = useParams();
  const navigate = useNavigate();

  const [slots, setSlots] = useState([]);
  const [siteData, setSiteData] = useState(null);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("Medium");
  const [isVip, setIsVip] = useState(false);
  const [loading, setLoading] = useState(false);

  const carImages = {
    normal: "https://cdn-icons-png.flaticon.com/512/3202/3202926.png",
    premium: "https://cdn-icons-png.flaticon.com/512/5540/5540542.png",
  };

  const fetchData = async () => {
    try {
      const slotRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/parking/slots/${siteId}`,
      );
      // console.log("slot data fetched:", slotRes.data); // debugging
      if (Array.isArray(slotRes.data)) setSlots(slotRes.data);

      const siteRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/parking/site/${siteId}`,
      );
      if (siteRes.data) setSiteData(siteRes.data);
    } catch (error) {
      console.error("Error loading data", error);
      // toast.error("failed to load parking data");
    }
  };

  useEffect(() => {
    fetchData();
  }, [siteId]);

  const handleBook = async (e) => {
    e.preventDefault();
    if (!vehicleNumber) return toast.error("Enter vehicle number!");
    const storedUserString = localStorage.getItem("user");
    if (!storedUserString) {
      toast.error("Please login to book a slot!");
      navigate("/login");
      return;
    }

    const storedUser = JSON.parse(storedUserString);

    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/parking/book`, {
        userId: storedUser._id,
        vehicleNumber,
        vehicleType,
        isVip,
        siteId,
      });

      if (res.data.success) {
        toast.success(`✅ Parked at ${res.data.slot.slotNumber}`);
        fetchData();
        setVehicleNumber("");
        setIsVip(false);
      }
    } catch (error) {
      console.log(error); // todo: remove this in prod
      toast.error(error.response?.data?.message || "Booking Failed");
    }
    setLoading(false);
  };

  const handleExit = (slot) => {
    const transactionDate = new Date().toLocaleString();
    navigate("/payment", { state: { slot, transactionDate } });
  };

  const handleGetRoute = () => {
    if (!siteData || !siteData.lat || !siteData.lng) {
      return toast.error("Location coordinates not found for this site.");
    }

    if (navigator.geolocation) {
      toast.info("Finding the fastest route...", { autoClose: 2000 });

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${siteData.lat},${siteData.lng}&travelmode=driving`;

          window.open(mapsUrl, "_blank");
        },
        (error) => {
          toast.error("Please enable location permissions in your browser.");
        },
      );
    } else {
      toast.error("Your browser doesn't support geolocation.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="bg-white p-3 rounded-full shadow hover:bg-gray-100 transition"
          >
            <FaArrowLeft />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-800 uppercase">
              {siteData ? siteData.name : "Parking Zone"}
            </h1>
            <p className="text-gray-500 flex items-center gap-2 text-sm font-medium">
              <FaMapMarkerAlt className="text-red-500" /> Live Availability
            </p>
          </div>
        </div>

        <button
          onClick={handleGetRoute}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:bg-blue-700 hover:-translate-y-1 transition-all"
        >
          <FaRoute size={20} /> Get Directions
        </button>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3">
          <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden sticky top-6 border border-gray-800">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full blur-3xl opacity-20 -translate-y-10 translate-x-10"></div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 relative z-10">
              <FaCheckCircle className="text-yellow-400" /> Entry Terminal
            </h3>

            <form onSubmit={handleBook} className="space-y-6 relative z-10">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                  Vehicle Number
                </label>
                <input
                  type="text"
                  placeholder="UP-32-AB-9999"
                  className="w-full p-4 bg-gray-800 rounded-lg border border-gray-700 outline-none focus:border-yellow-400 text-white uppercase font-bold tracking-wider"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                  Vehicle Type
                </label>
                <select
                  className="w-full p-4 bg-gray-800 rounded-lg border border-gray-700 outline-none focus:border-yellow-400 text-white"
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                >
                  <option value="Small">Bike (Small)</option>
                  <option value="Medium">Car (Medium)</option>
                  <option value="Large">Truck (Large)</option>
                </select>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-500 transition">
                <input
                  type="checkbox"
                  id="vip"
                  checked={isVip}
                  onChange={(e) => setIsVip(e.target.checked)}
                  className="w-5 h-5 accent-yellow-400 cursor-pointer"
                />
                <label
                  htmlFor="vip"
                  className="text-sm font-bold text-white cursor-pointer flex items-center gap-2"
                >
                  <FaCrown
                    className={isVip ? "text-yellow-400" : "text-gray-500"}
                  />{" "}
                  Premium Member
                </label>
              </div>

              <button
                disabled={loading}
                className={`w-full p-4 rounded-lg font-bold text-lg transition-all shadow-lg active:scale-95 ${isVip ? "bg-yellow-500 text-black hover:bg-yellow-400" : "bg-white text-black hover:bg-gray-200"}`}
              >
                {loading ? "Allocating..." : isVip ? "PARK VIP" : "PARK NOW"}
              </button>
            </form>
          </div>
        </div>

        <div className="w-full lg:w-2/3">
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
            {slots.map((slot) => (
              <div
                key={slot._id}
                onClick={() => (slot.isOccupied ? handleExit(slot) : null)}
                className={`relative h-24 rounded-xl flex flex-col items-center justify-center border-2 transition-all cursor-pointer shadow-sm hover:-translate-y-1 group
                   ${
                     slot.isOccupied
                       ? slot.isPremium
                         ? "bg-yellow-50 border-yellow-500"
                         : "bg-blue-50 border-blue-600"
                       : "bg-white border-gray-200 hover:border-green-400"
                   }`}
              >
                <div className="absolute top-1 left-2 text-xs font-black text-gray-400">
                  {slot.slotNumber}
                </div>
                {slot.isPremium && (
                  <div className="absolute top-1 right-1 text-[8px] bg-yellow-400 text-black px-1.5 rounded font-bold uppercase tracking-widest">
                    VIP
                  </div>
                )}

                {slot.isOccupied ? (
                  <div className="flex flex-col items-center mt-2">
                    <img
                      src={
                        slot.isPremium ? carImages.premium : carImages.normal
                      }
                      alt="Car"
                      className="w-12 h-12 object-contain drop-shadow-lg transform group-hover:scale-110 transition"
                    />
                    <span className="text-[9px] font-black text-gray-800 mt-1 uppercase bg-white/80 px-1 rounded">
                      {slot.vehicleNumber}
                    </span>
                  </div>
                ) : (
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full opacity-60 animate-pulse"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingDashboard;
