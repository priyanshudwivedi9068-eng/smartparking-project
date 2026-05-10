import React from "react";

const Analytics = () => {
  return (
    <div className="max-w-6xl mx-auto py-20 px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-gray-800 mb-4 uppercase">
          System Analytics
        </h2>
        <div className="w-24 h-1.5 bg-yellow-400 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Revenue Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-8 border-blue-500">
          <h3 className="text-gray-500 font-bold uppercase text-xs tracking-wider">
            Total Revenue
          </h3>
          <p className="text-4xl font-black text-gray-800 mt-2">$12,450</p>
          <p className="text-green-500 text-sm font-bold mt-2">
            ▲ 12% vs last week
          </p>
        </div>

        {/* Occupancy Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-8 border-yellow-400">
          <h3 className="text-gray-500 font-bold uppercase text-xs tracking-wider">
            Occupancy Rate
          </h3>
          <p className="text-4xl font-black text-gray-800 mt-2">85%</p>
          <p className="text-red-500 text-sm font-bold mt-2">
            ▼ 2% vs last week
          </p>
        </div>
      </div>

      {/* Placeholder Chart */}
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 h-64 flex items-center justify-center text-gray-400 font-bold border-dashed border-2">
        [ Live Traffic Graph Placeholder ]
      </div>
    </div>
  );
};

export default Analytics;
