import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import noUser from "../pages/noUser.png";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <header className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 bg-[#0d0d0d]/90 border-b border-zinc-800">
      <div className="flex items-center gap-2">
        <div className="relative">
          <img
            src={selectedUser.profilePic || noUser}
            alt={selectedUser.fullName}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-zinc-700"
          />
          {onlineUsers.includes(selectedUser._id) && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-[#0d0d0d]" />
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-zinc-100 sm:text-base">
            {selectedUser.fullName}
          </h3>
          <p
            className={`text-[11px] sm:text-sm ${
              onlineUsers.includes(selectedUser._id)
                ? "text-green-400"
                : "text-zinc-500"
            }`}
          >
            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <button
        onClick={() => setSelectedUser(null)}
        className="p-1 sm:p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition"
      >
        <X size={16} />
      </button>
    </header>
  );
};

export default ChatHeader;
