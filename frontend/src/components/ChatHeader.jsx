import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import noUser from "../pages/noUser.png";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <header className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/90 backdrop-blur-md flex items-center justify-between">
      {/* User Info Section */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative">
          <img
            src={selectedUser.profilePic || noUser}
            alt={selectedUser.fullName}
            className="size-10 rounded-full object-cover border border-zinc-700 shadow-sm"
          />
          {onlineUsers.includes(selectedUser._id) && (
            <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
          )}
        </div>

        {/* User Details */}
        <div className="flex flex-col">
          <h3 className="font-semibold text-zinc-100 leading-tight">
            {selectedUser.fullName}
          </h3>
          <p
            className={`text-sm ${
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
        className="p-2 rounded-full hover:bg-zinc-800 transition-all duration-200 text-zinc-400 hover:text-zinc-200"
      >
        <X className="size-5" />
      </button>
    </header>
  );
};

export default ChatHeader;
