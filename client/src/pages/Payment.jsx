import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaCheckCircle,
  FaSpinner,
  FaClock,
  FaCreditCard,
  FaGooglePay,
  FaMobileAlt,
  FaMoneyBillAlt,
} from "react-icons/fa";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [bill, setBill] = useState(0);
  const [durationString, setDurationString] = useState("0h 0m");
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  useEffect(() => {
    if (!state?.slot) return navigate("/");

    const entryTime = new Date(state.slot.entryTime);
    const currentTime = new Date();
    const diffInMs = currentTime - entryTime;

    const totalMinutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    setDurationString(`${hours}h ${minutes}m`);
    const billableHours = Math.max(1, Math.ceil(totalMinutes / 60));
    const rate = state.slot.isPremium ? 25 : 10;
    setBill(Math.abs(billableHours * rate));
  }, [state, navigate]);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/parking/exit`, {
        slotId: state.slot._id,
        paymentMethod: paymentMethod,
      });

      if (res.data.success) {
        toast.success(`✅ Paid ₹${bill} securely via ${paymentMethod}!`);
        navigate("/history");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment Failed!");
    } finally {
      setLoading(false);
    }
  };

  if (!state?.slot) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-200">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-black text-gray-800 uppercase tracking-wider">
            Checkout
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Select payment method to proceed
          </p>
        </div>

        <div className="bg-gray-900 text-white rounded-xl p-6 mb-6 shadow-inner relative overflow-hidden">
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full blur-2xl opacity-20"></div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-sm">Vehicle</span>
            <span className="font-bold tracking-widest">
              {state.slot.vehicleNumber}
            </span>
          </div>
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-700">
            <span className="text-gray-400 text-sm">Duration</span>
            <span className="font-bold flex items-center gap-1">
              <FaClock /> {durationString}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-300">
              Total Amount
            </span>
            <span className="text-4xl font-black text-yellow-400">₹{bill}</span>
          </div>
        </div>

        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">
          Pay Via
        </h3>
        <div className="space-y-3 mb-8">
          <div
            onClick={() => setPaymentMethod("UPI")}
            className={`p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${paymentMethod === "UPI" ? "border-yellow-400 bg-yellow-50" : "border-gray-100 hover:border-gray-300"}`}
          >
            <div className="flex items-center gap-3">
              <FaGooglePay
                size={32}
                className={
                  paymentMethod === "UPI" ? "text-black" : "text-gray-500"
                }
              />
              <span className="font-bold text-gray-800">UPI / GPay</span>
            </div>
            {paymentMethod === "UPI" && (
              <div className="w-4 h-4 bg-yellow-400 rounded-full border-2 border-white shadow"></div>
            )}
          </div>

          <div
            onClick={() => setPaymentMethod("Card")}
            className={`p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${paymentMethod === "Card" ? "border-yellow-400 bg-yellow-50" : "border-gray-100 hover:border-gray-300"}`}
          >
            <div className="flex items-center gap-3">
              <FaCreditCard
                size={24}
                className={
                  paymentMethod === "Card" ? "text-blue-600" : "text-gray-500"
                }
              />
              <span className="font-bold text-gray-800">
                Credit / Debit Card
              </span>
            </div>
            {paymentMethod === "Card" && (
              <div className="w-4 h-4 bg-yellow-400 rounded-full border-2 border-white shadow"></div>
            )}
          </div>

          <div
            onClick={() => setPaymentMethod("NetBanking")}
            className={`p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${paymentMethod === "NetBanking" ? "border-yellow-400 bg-yellow-50" : "border-gray-100 hover:border-gray-300"}`}
          >
            <div className="flex items-center gap-3">
              <FaMobileAlt
                size={24}
                className={
                  paymentMethod === "NetBanking"
                    ? "text-purple-600"
                    : "text-gray-500"
                }
              />
              <span className="font-bold text-gray-800">Net Banking</span>
            </div>
            {paymentMethod === "NetBanking" && (
              <div className="w-4 h-4 bg-yellow-400 rounded-full border-2 border-white shadow"></div>
            )}
          </div>

          <div
            onClick={() => setPaymentMethod("Paytm")}
            className={`p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${paymentMethod === "Paytm" ? "border-yellow-400 bg-yellow-50" : "border-gray-100 hover:border-gray-300"}`}
          >
            <div className="flex items-center gap-3">
              <FaMobileAlt
                size={24}
                className={
                  paymentMethod === "Paytm"
                    ? "text-blue-500"
                    : "text-gray-500"
                }
              />
              <span className="font-bold text-gray-800">Paytm</span>
            </div>
            {paymentMethod === "Paytm" && (
              <div className="w-4 h-4 bg-yellow-400 rounded-full border-2 border-white shadow"></div>
            )}
          </div>

          <div
            onClick={() => setPaymentMethod("Cash")}
            className={`p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${paymentMethod === "Cash" ? "border-yellow-400 bg-yellow-50" : "border-gray-100 hover:border-gray-300"}`}
          >
            <div className="flex items-center gap-3">
              <FaMoneyBillAlt
                size={24}
                className={
                  paymentMethod === "Cash"
                    ? "text-green-600"
                    : "text-gray-500"
                }
              />
              <span className="font-bold text-gray-800">Cash</span>
            </div>
            {paymentMethod === "Cash" && (
              <div className="w-4 h-4 bg-yellow-400 rounded-full border-2 border-white shadow"></div>
            )}
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full py-4 rounded-xl text-white font-black uppercase tracking-widest text-lg flex items-center justify-center gap-2 shadow-xl transition-all transform active:scale-95 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800 hover:-translate-y-1"}`}
        >
          {loading ? (
            <>
              Processing <FaSpinner className="animate-spin" />
            </>
          ) : (
            <>Pay ₹{bill} securely</>
          )}
        </button>
      </div>
    </div>
  );
};

export default Payment;
