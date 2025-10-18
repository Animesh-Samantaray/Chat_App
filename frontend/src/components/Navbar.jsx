import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Settings, UserCircle, LogOut } from 'lucide-react'

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <nav className="w-full bg-gray-900 text-white flex justify-between items-center px-8 py-4 shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold tracking-wide cursor-pointer hover:text-blue-400 transition-colors">
        Chat<span className="text-blue-400">App</span>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-6">
        {/* Settings */}
        <button
          className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          title="Settings"
        >
          <Settings className="size-5 text-gray-300 hover:text-blue-400 transition-colors" />
        </button>

        {/* Authenticated user section */}
        {authUser && (
          <div className="flex items-center gap-4">
            {/* User Avatar */}
            <div
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors"
              title={authUser.fullName || 'User'}
            >
              <UserCircle className="size-6 text-gray-300" />
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-blue-500/30"
            >
              <LogOut className="size-5" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
