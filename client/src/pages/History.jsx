import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaHistory,
  FaCarSide,
  FaClock,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
} from "react-icons/fa";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchHistory = async () => {
      const storedUserString = localStorage.getItem("user");
      if (!storedUserString) {
        setLoading(false);
        return;
      }
      const user = JSON.parse(storedUserString);

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/parking/history?userId=${user._id}`,
        );
        if (res.data.success) {
          setHistory(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-10 border-b border-gray-200 pb-6">
          <div className="bg-yellow-400 p-4 rounded-xl shadow-lg text-black">
            <FaHistory size={28} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-800 uppercase tracking-tight">
              Transaction History
            </h1>
            <p className="text-gray-500 font-medium mt-1">
              Track your past parking sessions and digital receipts.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <FaSpinner className="animate-spin text-4xl mb-4 text-yellow-400" />
            <p className="font-bold tracking-widest uppercase">
              Loading Records...
            </p>
          </div>
        ) : history.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCarSide className="text-gray-300 text-4xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No History Found
            </h3>
            <p className="text-gray-500">
              You haven't parked with SpotSync yet. Your future bookings will
              appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((record) => (
              <div
                key={record._id}
                className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden group"
              >
                <div
                  className={`absolute top-0 left-0 w-full h-1.5 ${
                    record.status === "Completed"
                      ? "bg-green-500"
                      : record.status === "Active"
                        ? "bg-yellow-400"
                        : "bg-red-500"
                  }`}
                ></div>

                <div className="flex justify-between items-start mb-6 mt-2">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                      Vehicle No.
                    </span>
                    <h4 className="text-xl font-black text-gray-800 uppercase bg-gray-100 px-2 py-1 rounded inline-block border border-gray-200">
                      {record.vehicleNumber}
                    </h4>
                    {record.slotId?.siteId && (
                      <p className="text-xs font-bold text-gray-500 mt-2 uppercase tracking-wide">
                        📍 {record.slotId.siteId.name}
                      </p>
                    )}
                  </div>
                  <div
                    className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                      record.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : record.status === "Active"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {record.status === "Completed" ? (
                      <FaCheckCircle />
                    ) : record.status === "Active" ? (
                      <FaClock className="animate-pulse" />
                    ) : (
                      <FaTimesCircle />
                    )}
                    {record.status}
                  </div>
                </div>

                <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
                      <FaClock /> Entry
                    </span>
                    <span className="text-sm font-medium text-gray-800">
                      {formatDate(record.entryTime)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
                      <FaClock /> Exit
                    </span>
                    <span className="text-sm font-medium text-gray-800">
                      {formatDate(record.exitTime)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase block mb-1">
                      Plan
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded uppercase ${record.isPremium ? "bg-black text-yellow-400" : "bg-gray-200 text-gray-700"}`}
                    >
                      {record.isPremium ? "VIP Premium" : "Standard"}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-gray-400 uppercase block mb-1">
                      Total Paid
                    </span>
                    <span className="text-2xl font-black text-green-600 flex items-center gap-1 justify-end">
                      <FaMoneyBillWave size={16} className="text-green-500" />$
                      {record.totalAmount || 0}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
