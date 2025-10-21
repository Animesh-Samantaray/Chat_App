import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Settings, UserCircle, LogOut, Home, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900/80 backdrop-blur-md text-white border-b border-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-2xl font-extrabold tracking-wide cursor-pointer bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text select-none hover:opacity-90 transition"
        >
          Chat<span className="text-blue-400">App</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 text-gray-300 hover:text-blue-400 transition-colors text-sm font-medium"
          >
            <Home className="size-4" />
            Home
          </button>

          {authUser ? (
            <div className="flex items-center gap-4">
              {/* Profile */}
              <div
                onClick={() => navigate("/profile")}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 transition-all border border-gray-600"
                title={authUser.fullName || "User"}
              >
                <UserCircle className="size-6 text-gray-200" />
              </div>

              {/* Logout */}
              <button
                onClick={logout}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-blue-500/30 active:scale-95 transition-all"
              >
                <LogOut className="size-4" />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/signin")}
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-lg shadow-md hover:shadow-blue-500/30 transition-all active:scale-95"
            >
              Log In
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-md hover:bg-gray-800 transition"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 shadow-inner">
          <div className="flex flex-col px-4 py-3 gap-3">
            <button
              onClick={() => { navigate("/"); setMobileOpen(false); }}
              className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors text-sm font-medium"
            >
              <Home className="size-4" />
              Home
            </button>

            {authUser ? (
              <>
                <button
                  onClick={() => { navigate("/profile"); setMobileOpen(false); }}
                  className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors text-sm font-medium"
                >
                  <UserCircle className="size-5" />
                  Profile
                </button>
                <button
                  onClick={() => { logout(); setMobileOpen(false); }}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-blue-500/30 transition-all"
                >
                  <LogOut className="size-4" />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => { navigate("/signin"); setMobileOpen(false); }}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-lg shadow-md hover:shadow-blue-500/30 transition-all"
              >
                Log In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
