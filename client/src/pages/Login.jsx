import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { FaEnvelope, FaLock, FaUser, FaKey, FaSpinner } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/parking/auth/signup`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
      );
      if (res.data.success) {
        toast.success("OTP sent to your email!");
        setStep(2);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
    setLoading(false);
  };
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/parking/auth/verify`,
        {
          email: formData.email,
          otp: formData.otp,
        }
      );
      if (res.data.success) {
        toast.success(`Welcome to SpotSync, ${res.data.user.name}!`);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    }
    setLoading(false);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/parking/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        },
      );
      if (res.data.success) {
        toast.success("OTP sent to your email!");
        setStep(2);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    }
    setLoading(false);
  };
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/parking/auth/google`,
        {
          token: credentialResponse.credential,
        },
      );
      if (res.data.success) {
        toast.success(`Welcome, ${res.data.user.name}!`);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        navigate("/");
      }
    } catch (error) {
      toast.error("Google Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden font-sans">
      <div className="absolute w-[500px] h-[500px] bg-yellow-400 rounded-full blur-[150px] opacity-10 top-[-100px] left-[-100px]"></div>

      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/20 text-center w-full max-w-md relative z-10">
        <h1 className="text-4xl font-black text-white mb-2 tracking-tighter">
          SPOT<span className="text-yellow-400">SYNC</span>
        </h1>
        <p className="text-gray-300 mb-8 font-medium text-sm">
          {step === 2
            ? "Check your email for the OTP"
            : isLogin
              ? "Login to access your dashboard"
              : "Create your premium account"}
        </p>
        
        {step === 2 ? (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div className="relative">
              <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="otp"
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                required
                value={formData.otp}
                onChange={handleChange}
                className="w-full p-4 pl-12 bg-gray-800/50 text-white rounded-xl border border-gray-600 outline-none focus:border-yellow-400 text-center tracking-[0.5em] font-bold"
              />
            </div>
            <button
              disabled={loading}
              className="w-full bg-yellow-400 text-black py-4 rounded-xl font-black uppercase tracking-widest hover:bg-yellow-300 transition shadow-lg flex justify-center items-center gap-2"
            >
              {loading ? <FaSpinner className="animate-spin" /> : "Verify & Enter"}
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-gray-400 text-xs mt-4 hover:text-white transition"
            >
              Wrong email? Go back
            </button>
          </form>
        ) : (
          <>
            <form
              onSubmit={isLogin ? handleLogin : handleSignup}
              className="space-y-5"
            >
          {!isLogin && (
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 pl-12 bg-gray-800/50 text-white rounded-xl border border-gray-600 outline-none focus:border-yellow-400"
              />
            </div>
          )}

          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 pl-12 bg-gray-800/50 text-white rounded-xl border border-gray-600 outline-none focus:border-yellow-400"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 pl-12 bg-gray-800/50 text-white rounded-xl border border-gray-600 outline-none focus:border-yellow-400"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-yellow-400 text-black py-4 rounded-xl font-black uppercase tracking-widest hover:bg-yellow-300 transition shadow-lg flex justify-center items-center gap-2"
          >
            {loading ? (
              <FaSpinner className="animate-spin" />
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-xs text-gray-400">
          <span className="w-1/5 border-b border-gray-600"></span>
          <span className="uppercase tracking-widest">Or Continue With</span>
          <span className="w-1/5 border-b border-gray-600"></span>
        </div>

        <div className="mt-6 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Google Sign-In Failed")}
            useOneTap
            theme="filled_black"
            shape="pill"
            size="large"
          />
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setStep(1);
            }}
            className="text-gray-400 text-sm hover:text-white transition group"
          >
            {isLogin ? "New here? " : "Already have an account? "}
            <span className="text-yellow-400 font-bold group-hover:underline">
              {isLogin ? "Create Account" : "Sign In"}
            </span>
          </button>
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
