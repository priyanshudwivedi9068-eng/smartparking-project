import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
const styles = `
  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-down { animation: fadeInDown 0.3s ease-out forwards; }
`;

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (val) => {
    setQuery(val);
    if (val.length > 1) {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/parking/sites?query=${val}`,
        );
        setResults(res.data);
      } catch (err) {
        console.error("Search Error:", err);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <div className="w-full max-w-3xl relative z-50">
      <style>{styles}</style>

      <div className="bg-white p-2 rounded-full shadow-2xl flex items-center pl-8 transition-transform hover:scale-105 border border-transparent focus-within:border-yellow-400">
        <FaSearch className="text-gray-400 text-xl" />
        <input
          type="text"
          placeholder="Search location (e.g. Medanta, Changi, Phoenix...)"
          className="w-full p-4 outline-none text-gray-800 text-lg font-medium bg-transparent placeholder-gray-400"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-yellow-400 hover:text-black transition">
          GO
        </button>
      </div>

      {results.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-4 bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-down border border-gray-200 text-left">
          {results.map((site) => (
            <div
              key={site._id}
              onClick={() => navigate(`/parking/${site._id}`)}
              className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0 transition group"
            >
              <img
                src={site.image}
                alt={site.name}
                className="w-20 h-16 rounded-lg object-cover group-hover:scale-105 transition"
              />

              <div className="flex-1">
                <h4 className="font-bold text-gray-800 text-lg group-hover:text-yellow-600 transition">
                  {site.name}
                </h4>
                <p className="text-gray-500 text-sm flex items-center gap-1">
                  <FaMapMarkerAlt className="text-red-500" /> {site.location}
                </p>
              </div>

              <FaArrowRight className="ml-auto text-gray-300 group-hover:text-black" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
