import React, { useEffect, useState } from "react";
import noUser from "../pages/noUser.png";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
 
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const {onlineUsers} = useAuthStore();
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-zinc-800 bg-zinc-900 flex flex-col transition-all duration-300">
      {/* Header */}
      <div className="border-b border-zinc-800 w-full p-5">
        <div className="flex items-center gap-3">
          <Users className="size-6 text-zinc-400" />
          <span className="font-semibold text-zinc-100 hidden lg:block">
            Contacts
          </span>
        </div>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto w-full py-3 space-y-1">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full px-4 py-3 flex items-center gap-3 rounded-xl transition-all duration-200 hover:bg-zinc-800/70 ${
              selectedUser?._id === user._id
                ? "bg-zinc-800 ring-1 ring-zinc-700"
                : ""
            }`}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || noUser}
                alt={user.fullName}
                className="size-12 object-cover rounded-full border border-zinc-700"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
              )}
            </div>

            <div className="hidden lg:block text-left min-w-0">
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
            No Online Users
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
