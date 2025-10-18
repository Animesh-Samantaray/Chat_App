import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react"; // 👀 Lucide icons
import { useAuthStore } from "../store/useAuthStore.js";
import toast from "react-hot-toast"; // make sure you have react-hot-toast
import { axiosInstance } from "../lib/axios.js";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { authUser, login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const validateForm = () => {
    const { email, password } = formData;

    if (!email.trim()) {
      toast.error("Email is required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (!password.trim()) {
      toast.error("Password cannot be empty.");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (validateForm(formData)) {
      login(formData);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleOnSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-all duration-200"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link className="text-indigo-600 hover:underline cursor-pointer font-medium"  to={'/signup'}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
