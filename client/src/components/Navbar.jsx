import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaPhoneAlt,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaInstagram,
  FaCar,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [user, setUser] = useState(null);
  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  const linkClass = (path) =>
    `text-sm font-bold uppercase tracking-wide transition-colors ${location.pathname === path ? "text-yellow-600 border-b-2 border-yellow-500" : "text-gray-700 hover:text-yellow-500"}`;

  return (
    <div className="w-full shadow-md z-50 font-sans relative">
      <div className="bg-yellow-400 py-2 px-4 text-black text-xs font-bold tracking-wider">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-6 items-center">
            <span className="flex items-center gap-2">📞 24/7 Service</span>
            <span className="hidden sm:flex items-center gap-2">
              Enquiry: +91-98765-43210
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <FaFacebookF className="cursor-pointer hover:text-blue" />
            <FaYoutube className="cursor-pointer hover:text-red" />
            <FaLinkedinIn className="cursor-pointer hover:text-blue" />
            <FaInstagram className="cursor-pointer hover:text-pink" />
          </div>
        </div>
      </div>

      <nav className="bg-grey py-4 px-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-lg border border-gray-800 group-hover:border-yellow-400 transition-colors duration-300">
              <svg
                className="w-6 h-6 text-yellow-400 transform group-hover:scale-110 transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 8H8V20H4V8Z" fill="currentColor" />
                <path
                  d="M10 4H14V20H10V4Z"
                  fill="currentColor"
                  fillOpacity="0.8"
                />
                <path
                  d="M16 12H20V20H16V12Z"
                  fill="currentColor"
                  fillOpacity="0.6"
                />
                <path
                  d="M4 18H20"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-2xl font-black tracking-tighter text-gray-900 leading-none group-hover:text-yellow-600 transition-colors">
                SPOT<span className="text-yellow-500">SYNC</span>
              </span>
              <span className="text-[9px] font-bold text-gray-400 tracking-[0.3em] mt-0.5">
                PREMIUM PARKING
              </span>
            </div>
          </Link>

          <div className="hidden md:flex gap-8 items-center">
            <Link to="/" className={linkClass("/")}>
              Home
            </Link>
            <Link to="/pricing" className={linkClass("/pricing")}>
              Products
            </Link>
            <Link to="/history" className={linkClass("/history")}>
              History
            </Link>
            <Link to="/analytics" className={linkClass("/analytics")}>
              Analytics
            </Link>
            <Link to="/support" className={linkClass("/support")}>
              Contact
            </Link>
            <Link
              to="/rent-space"
              className={`text-sm font-bold uppercase tracking-wide transition-colors ${location.pathname === "/rent-space" ? "text-yellow-600 border-b-2 border-yellow-500" : "text-yellow-600 hover:text-black"}`}
            >
              Rent Space
            </Link>

            {user ? (
              <div className="relative group ml-4 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-lg text-black shadow-md border-2 border-transparent group-hover:border-black transition-colors uppercase">
                  {user.name ? user.name.charAt(0) : "U"}
                </div>

                <div className="absolute right-0 top-12 bg-white border border-gray-100 shadow-xl rounded-xl w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 flex flex-col overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <p className="text-sm font-bold text-gray-800 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      localStorage.removeItem("user");
                      localStorage.removeItem("token");
                      window.location.href = "/";
                    }}
                    className="text-left px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className={`${linkClass("/login")} ml-4`}>
                Login
              </Link>
            )}
          </div>

          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
