import React from "react";
import { FaHandshake, FaMoneyBillWave, FaShieldAlt } from "react-icons/fa";

const RentSpace = () => {
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* 1. Hero Section */}
      <div className="relative w-full h-[400px]">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <img
          src="/assets/rent_space_hero.jpg"
          alt="Empty Land"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tight">
            Monetize Your <span className="text-yellow-400">Empty Land</span>
          </h1>
          <p className="text-lg md:text-xl font-light mb-8 max-w-2xl">
            Turn your unused property into a smart parking zone and earn passive
            income with SpotSync.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-6">
        {/* 2. Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 border border-gray-100 shadow-lg rounded-xl">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-600 text-2xl">
              <FaMoneyBillWave />
            </div>
            <h3 className="font-bold text-xl mb-2">Passive Income</h3>
            <p className="text-gray-500 text-sm">
              Earn monthly revenue without lifting a finger. We handle the
              bookings.
            </p>
          </div>
          <div className="text-center p-6 border border-gray-100 shadow-lg rounded-xl">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-600 text-2xl">
              <FaHandshake />
            </div>
            <h3 className="font-bold text-xl mb-2">Full Management</h3>
            <p className="text-gray-500 text-sm">
              Our automated system handles entry, exit, and payments.
            </p>
          </div>
          <div className="text-center p-6 border border-gray-100 shadow-lg rounded-xl">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-600 text-2xl">
              <FaShieldAlt />
            </div>
            <h3 className="font-bold text-xl mb-2">Secure & Legal</h3>
            <p className="text-gray-500 text-sm">
              We provide verified contracts and insurance coverage.
            </p>
          </div>
        </div>

        {/* 3. Application Form */}
        <div className="bg-gray-50 p-8 md:p-12 rounded-2xl border-l-8 border-yellow-400 shadow-xl max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-gray-800 mb-6 uppercase">
            Partner Application
          </h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-white rounded border border-gray-300 outline-none focus:border-yellow-400"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-white rounded border border-gray-300 outline-none focus:border-yellow-400"
                  placeholder="+91 98765 00000"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                Property Address
              </label>
              <input
                type="text"
                className="w-full p-4 bg-white rounded border border-gray-300 outline-none focus:border-yellow-400"
                placeholder="123, Civil Lines, Kanpur..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Estimated Area (Sq Ft)
                </label>
                <input
                  type="number"
                  className="w-full p-4 bg-white rounded border border-gray-300 outline-none focus:border-yellow-400"
                  placeholder="e.g. 5000"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Property Type
                </label>
                <select className="w-full p-4 bg-white rounded border border-gray-300 outline-none focus:border-yellow-400">
                  <option>Open Land / Empty Plot</option>
                  <option>Basement Parking</option>
                  <option>Commercial Complex</option>
                  <option>Residential Garage</option>
                </select>
              </div>
            </div>

            <button className="w-full bg-black text-white p-4 rounded font-bold uppercase tracking-widest hover:bg-gray-800 transition shadow-lg mt-4">
              Submit Proposal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RentSpace;
