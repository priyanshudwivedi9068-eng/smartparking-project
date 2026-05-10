import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ParkingDashboard from "./pages/ParkingDashboard";
import Payment from "./pages/Payment";
import Login from "./pages/Login";
import History from "./pages/History";
import Members from "./pages/Members";
import Pricing from "./pages/Pricing";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import RentSpace from "./pages/RentSpace";
import Contact from "./pages/Contact";
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <ToastContainer position="top-right" theme="colored" />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/parking/:siteId" element={<ParkingDashboard />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/history" element={<History />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/members" element={<Members />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/rent-space" element={<RentSpace />} />
          <Route path="/support" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
