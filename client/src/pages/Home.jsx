import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import SearchBar from "../components/SearchBar";

const customStyles = `
  @keyframes scrollRightToLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  @keyframes scrollLeftToRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
  .animate-scroll-logos { display: flex; width: max-content; animation: scrollRightToLeft 30s linear infinite; }
  .animate-scroll-projects { display: flex; width: max-content; animation: scrollLeftToRight 40s linear infinite; }
  .animate-scroll-logos:hover, .animate-scroll-projects:hover { animation-play-state: paused; }
`;

const Home = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchAllSites = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/parking/sites`);
        setProjects(res.data);
      } catch (error) {
        console.error("Error fetching dynamic sites:", error);
      }
    };
    fetchAllSites();
  }, []);

  const products = [
    {
      title: "Parksafe 580",
      desc: "Automated Tower",
      img: "/assets/product_automated_tower.jpg",
    },
    {
      title: "Combilift 543",
      desc: "Puzzle Parking",
      img: "/assets/product_puzzle_parking.jpg",
    },
    {
      title: "Turntable 505",
      desc: "Rotation Unit",
      img: "/assets/product_turntable.jpg",
    },
  ];

  return (
    <div className="bg-white min-h-screen font-sans relative overflow-x-hidden">
      <style>{customStyles}</style>

      <div className="relative w-full h-[600px] flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img
          src="/assets/hero_city_parking.jpg"
          alt="City Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-20 w-full max-w-4xl flex flex-col items-center">
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 drop-shadow-2xl tracking-tighter">
            SPOT<span className="text-yellow-400">SYNC</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light drop-shadow-md">
            Find and book premium parking spaces instantly.
          </p>

          <SearchBar />
        </div>
      </div>

      <div className="w-full py-16 px-0 overflow-hidden bg-gray-50">
        <div className="text-center mb-12 px-6">
          <h2 className="text-4xl font-black text-gray-800 mb-2 font-serif">
            Key Locations
          </h2>
        </div>

        {projects.length > 0 ? (
          <div className="relative w-full overflow-hidden">
            <div className="animate-scroll-logos flex gap-8">
              {[
                ...projects,
                ...projects,
                ...projects,
                ...projects,
                ...projects,
                ...projects,
              ].map((proj, idx) => (
                <div
                  key={`${proj._id}-${idx}`}
                  onClick={() => navigate(`/parking/${proj._id}`)}
                  className="group cursor-pointer w-[350px] flex-shrink-0"
                >
                  <div className="overflow-hidden rounded-lg shadow-md mb-3 h-56 border border-gray-100 relative">
                    <img
                      src={proj.image}
                      alt={proj.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300"></div>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg leading-tight group-hover:text-yellow-600 transition text-center">
                    {proj.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 text-center font-medium">
                    {proj.totalSlots || 30} Spaces
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 font-bold tracking-widest uppercase">
            Loading Live Locations...
          </div>
        )}
      </div>

      <div className="bg-white py-16 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-800 mb-2 font-serif">
              Our Products
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((prod, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl shadow-lg border-b-4 border-transparent hover:border-yellow-400"
              >
                <div className="h-40 overflow-hidden rounded-lg mb-4">
                  <img
                    src={prod.img}
                    alt={prod.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {prod.title}
                </h3>
                <p className="text-gray-500 text-sm">{prod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
