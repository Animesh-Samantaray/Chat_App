import React, { useEffect, useState } from "react";
import noUser from "../pages/noUser.png";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="flex-shrink-0 w-20 sm:w-24 md:w-28 lg:w-72 bg-zinc-900 border-r border-zinc-800 flex flex-col transition-all duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-zinc-800">
        <Users className="w-5 h-5 text-zinc-400" />
        <span className="font-semibold text-zinc-100 hidden lg:block">
          Contacts
        </span>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto py-3 space-y-2 px-2">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full px-3 py-2 flex items-center gap-3 rounded-md transition-all duration-150 hover:bg-zinc-800/70 ${
              selectedUser?._id === user._id
                ? "bg-zinc-800 ring-1 ring-zinc-700"
                : ""
            }`}
          >
            <div className="relative flex-shrink-0">
              <img
                src={user.profilePic || noUser}
                alt={user.fullName}
                className="w-10 h-10 object-cover rounded-full border border-zinc-700 hover:scale-110 transition-transform"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-black" />
              )}
            </div>

            <div className="flex flex-col min-w-0 hidden lg:flex">
              <div className="font-medium text-zinc-100 truncate">
                {user.fullName}
              </div>
              <div
                className={`text-sm ${
                  onlineUsers.includes(user._id)
                    ? "text-green-400"
                    : "text-zinc-500"
                }`}
              >
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-5 text-sm">
            No Users
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
