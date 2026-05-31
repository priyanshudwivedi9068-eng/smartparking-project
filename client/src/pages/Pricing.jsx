import React from "react";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

const Pricing = () => {
  const handlePayment = (planName) => {
    toast.success(`✅ Successfully subscribed to ${planName} via Online Payment!`);
  };

  return (
    <div className="max-w-6xl mx-auto py-20 px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-gray-800 mb-4 uppercase">
          Our Products & Pricing
        </h2>
        <div className="w-24 h-1.5 bg-yellow-400 mx-auto rounded-full"></div>
        <p className="text-gray-500 mt-4">
          Flexible automated parking rates for every need.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Standard Plan */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:border-yellow-400 transition transform hover:-translate-y-2">
          <h3 className="text-xl font-bold text-gray-800">Standard Parking</h3>
          <p className="text-4xl font-black text-yellow-500 my-4">
            ₹50<span className="text-sm text-gray-400 font-medium">/hour</span>
          </p>
          <ul className="space-y-3 text-gray-600 mb-8">
            <li className="flex items-center gap-2">
              <FaCheck className="text-green-500" /> Covered Parking
            </li>
            <li className="flex items-center gap-2">
              <FaCheck className="text-green-500" /> 24/7 Security
            </li>
          </ul>
          <button 
            onClick={() => handlePayment("Standard Parking")}
            className="w-full bg-gray-100 py-3 rounded font-bold hover:bg-gray-200 text-gray-800">
            Pay Online Now
          </button>
        </div>

        {/* Premium Plan (Highlighted) */}
        <div className="bg-black text-white p-8 rounded-xl shadow-2xl transform scale-105 border-t-8 border-yellow-400 relative z-10">
          <div className="uppercase text-xs font-bold text-yellow-400 mb-2 tracking-widest">
            Most Popular
          </div>
          <h3 className="text-xl font-bold">VIP Premium</h3>
          <p className="text-4xl font-black text-white my-4">
            ₹100<span className="text-sm text-gray-400 font-medium">/hour</span>
          </p>
          <ul className="space-y-3 text-gray-300 mb-8">
            <li className="flex items-center gap-2">
              <FaCheck className="text-yellow-400" /> Instant Entry (No Waiting)
            </li>
            <li className="flex items-center gap-2">
              <FaCheck className="text-yellow-400" /> Extra Wide Slots
            </li>
            <li className="flex items-center gap-2">
              <FaCheck className="text-yellow-400" /> EV Charging Included
            </li>
          </ul>
          <button 
            onClick={() => handlePayment("VIP Premium")}
            className="w-full bg-yellow-400 text-black py-3 rounded font-bold hover:bg-yellow-300 transition">
            Pay Online Now
          </button>
        </div>

        {/* Monthly Plan */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:border-yellow-400 transition transform hover:-translate-y-2">
          <h3 className="text-xl font-bold text-gray-800">Monthly Pass</h3>
          <p className="text-4xl font-black text-yellow-500 my-4">
            ₹3000
            <span className="text-sm text-gray-400 font-medium">/month</span>
          </p>
          <ul className="space-y-3 text-gray-600 mb-8">
            <li className="flex items-center gap-2">
              <FaCheck className="text-green-500" /> Unlimited Access
            </li>
            <li className="flex items-center gap-2">
              <FaCheck className="text-green-500" /> Reserved Spot
            </li>
          </ul>
          <button 
            onClick={() => handlePayment("Monthly Pass")}
            className="w-full bg-gray-100 py-3 rounded font-bold hover:bg-gray-200 text-gray-800">
            Pay Online Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
