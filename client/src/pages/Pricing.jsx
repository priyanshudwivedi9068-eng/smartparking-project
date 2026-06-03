import React, { useState } from "react";
import { FaCheck, FaTimes, FaSpinner, FaCreditCard, FaGooglePay, FaMobileAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const openPaymentModal = (planName, amount) => {
    setSelectedPlan({ name: planName, amount });
    setPaymentMethod("UPI");
  };

  const processPayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`✅ Successfully subscribed to ${selectedPlan.name} via ${paymentMethod}!`);
      setSelectedPlan(null);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto py-20 px-6 relative">
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
            onClick={() => openPaymentModal("Standard Parking", 50)}
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
            onClick={() => openPaymentModal("VIP Premium", 100)}
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
            onClick={() => openPaymentModal("Monthly Pass", 3000)}
            className="w-full bg-gray-100 py-3 rounded font-bold hover:bg-gray-200 text-gray-800">
            Pay Online Now
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 relative overflow-hidden">
            <button 
              onClick={() => setSelectedPlan(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition"
            >
              <FaTimes size={20} />
            </button>

            <div className="p-8">
              <h2 className="text-2xl font-black text-gray-800 uppercase tracking-wider text-center mb-1">
                Checkout
              </h2>
              <p className="text-center text-gray-500 text-sm mb-6">Complete your subscription</p>

              <div className="bg-gray-900 text-white rounded-xl p-6 mb-6 shadow-inner">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-700">
                  <span className="text-gray-400 text-sm">Plan</span>
                  <span className="font-bold tracking-widest text-yellow-400 uppercase">
                    {selectedPlan.name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-300">Total</span>
                  <span className="text-3xl font-black text-white">₹{selectedPlan.amount}</span>
                </div>
              </div>

              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Pay Via
              </h3>
              <div className="space-y-2 mb-8">
                {/* UPI Option */}
                <div
                  onClick={() => setPaymentMethod("UPI")}
                  className={`p-3 rounded-lg border-2 flex items-center justify-between cursor-pointer transition-all ${paymentMethod === "UPI" ? "border-yellow-400 bg-yellow-50" : "border-gray-100"}`}
                >
                  <div className="flex items-center gap-3">
                    <FaGooglePay size={28} className={paymentMethod === "UPI" ? "text-black" : "text-gray-500"} />
                    <span className="font-bold text-gray-800 text-sm">UPI / GPay</span>
                  </div>
                  {paymentMethod === "UPI" && <div className="w-3 h-3 bg-yellow-400 rounded-full border-2 border-white shadow"></div>}
                </div>

                {/* Card Option */}
                <div
                  onClick={() => setPaymentMethod("Card")}
                  className={`p-3 rounded-lg border-2 flex items-center justify-between cursor-pointer transition-all ${paymentMethod === "Card" ? "border-yellow-400 bg-yellow-50" : "border-gray-100"}`}
                >
                  <div className="flex items-center gap-3">
                    <FaCreditCard size={20} className={paymentMethod === "Card" ? "text-blue-600" : "text-gray-500"} />
                    <span className="font-bold text-gray-800 text-sm">Credit / Debit Card</span>
                  </div>
                  {paymentMethod === "Card" && <div className="w-3 h-3 bg-yellow-400 rounded-full border-2 border-white shadow"></div>}
                </div>

                {/* Paytm Option */}
                <div
                  onClick={() => setPaymentMethod("Paytm")}
                  className={`p-3 rounded-lg border-2 flex items-center justify-between cursor-pointer transition-all ${paymentMethod === "Paytm" ? "border-yellow-400 bg-yellow-50" : "border-gray-100"}`}
                >
                  <div className="flex items-center gap-3">
                    <FaMobileAlt size={20} className={paymentMethod === "Paytm" ? "text-blue-500" : "text-gray-500"} />
                    <span className="font-bold text-gray-800 text-sm">Paytm</span>
                  </div>
                  {paymentMethod === "Paytm" && <div className="w-3 h-3 bg-yellow-400 rounded-full border-2 border-white shadow"></div>}
                </div>
              </div>

              <button
                onClick={processPayment}
                disabled={loading}
                className={`w-full py-4 rounded-xl text-white font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"}`}
              >
                {loading ? (
                  <>Processing <FaSpinner className="animate-spin" /></>
                ) : (
                  <>Pay ₹{selectedPlan.amount} Securely</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pricing;
