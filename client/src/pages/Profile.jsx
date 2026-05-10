import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaHeadset,
} from "react-icons/fa";
import { toast } from "react-toastify";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("✅ Message sent! Our support team will contact you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <div className="bg-black text-white py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-yellow-400 rounded-full blur-[100px] opacity-20"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="bg-yellow-400 text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-400/20">
            <FaHeadset size={30} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            How Can We <span className="text-yellow-400">Help?</span>
          </h1>
          <p className="text-gray-400 text-lg font-medium">
            Our support team is available 24/7 to assist you with your parking
            reservations, billing, and account settings.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex items-start gap-4 transform transition hover:-translate-y-1 hover:border-yellow-400">
              <div className="bg-gray-100 p-4 rounded-full text-black">
                <FaPhoneAlt size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 uppercase tracking-widest text-sm mb-1">
                  Call Us (24/7)
                </h3>
                <p className="text-gray-600 font-medium">+91 98765 43210</p>
                <p className="text-gray-600 font-medium">+91 98765 00000</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex items-start gap-4 transform transition hover:-translate-y-1 hover:border-yellow-400">
              <div className="bg-gray-100 p-4 rounded-full text-black">
                <FaEnvelope size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 uppercase tracking-widest text-sm mb-1">
                  Email Us
                </h3>
                <p className="text-gray-600 font-medium">
                  support@spotsync.com
                </p>
                <p className="text-gray-600 font-medium">
                  billing@spotsync.com
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex items-start gap-4 transform transition hover:-translate-y-1 hover:border-yellow-400">
              <div className="bg-gray-100 p-4 rounded-full text-black">
                <FaMapMarkerAlt size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 uppercase tracking-widest text-sm mb-1">
                  Headquarters
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  SpotSync Technologies
                  <br />
                  Cyber Hub, Phase 2<br />
                  Gurugram, Haryana, 122002
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 border-t-8 border-t-yellow-400">
            <h2 className="text-3xl font-black text-gray-800 uppercase tracking-tight mb-2">
              Send a Message
            </h2>
            <p className="text-gray-500 mb-8">
              Fill out the form below and we will get back to you within 2
              hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-4 bg-gray-50 rounded-lg border border-gray-200 outline-none focus:border-yellow-400 focus:bg-white transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-4 bg-gray-50 rounded-lg border border-gray-200 outline-none focus:border-yellow-400 focus:bg-white transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-gray-50 rounded-lg border border-gray-200 outline-none focus:border-yellow-400 focus:bg-white transition-colors text-gray-700"
                >
                  <option value="" disabled>
                    Select a topic...
                  </option>
                  <option value="Booking Issue">
                    Booking & Reservation Issue
                  </option>
                  <option value="Billing">Billing & Refunds</option>
                  <option value="Account">Account Management</option>
                  <option value="Feedback">General Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full p-4 bg-gray-50 rounded-lg border border-gray-200 outline-none focus:border-yellow-400 focus:bg-white transition-colors resize-none"
                  placeholder="How can we help you today?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 shadow-xl transition-all transform active:scale-95 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-yellow-400 hover:text-black"}`}
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message <FaPaperPlane />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
