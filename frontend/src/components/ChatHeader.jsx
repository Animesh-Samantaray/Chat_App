import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import noUser from "../pages/noUser.png";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <header
      className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 
      bg-gradient-to-r from-[#0f0f0f] via-[#1a1a1a] to-[#111111]
      border-b border-zinc-800 shadow-lg backdrop-blur-md"
    >
      {/* Left Side - User Info */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Profile Avatar */}
        <div className="relative">
          <img
            src={selectedUser.profilePic || noUser}
            alt={selectedUser.fullName}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-zinc-700 
              hover:scale-105 transition-transform duration-200"
          />
          {onlineUsers.includes(selectedUser._id) && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 
              bg-green-500 rounded-full ring-2 ring-[#0d0d0d]" />
          )}
        </div>

        {/* User Name and Status */}
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-zinc-100 truncate max-w-[120px] sm:max-w-[180px]">
            {selectedUser.fullName}
          </h3>
          <p
            className={`text-[11px] sm:text-xs ${
              onlineUsers.includes(selectedUser._id)
                ? "text-green-400"
                : "text-zinc-500"
            }`}
          >
            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setSelectedUser(null)}
        className="p-1 sm:p-2 rounded-full bg-zinc-800/40 hover:bg-zinc-700/70 
          text-zinc-400 hover:text-zinc-100 transition-all duration-200
          shadow-inner hover:shadow-zinc-900/50"
      >
        <X size={16} className="sm:w-5 sm:h-5" />
      </button>
    </header>
  );
};

export default ChatHeader;
