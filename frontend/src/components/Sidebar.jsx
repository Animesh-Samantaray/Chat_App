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
    ? users.filter((u) => onlineUsers.includes(u._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="flex-shrink-0 w-16 sm:w-20 md:w-24 lg:w-72 bg-[#0d0d0d] border-r border-zinc-800 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 p-3 border-b border-zinc-800">
        <Users className="w-4 h-4 text-zinc-400" />
        <span className="text-sm font-semibold text-zinc-100 hidden lg:block">
          Contacts
        </span>
      </div>

      {/* Users */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {filteredUsers.map((u) => (
          <button
            key={u._id}
            onClick={() => setSelectedUser(u)}
            className={`flex items-center gap-2 w-full px-2 py-2 rounded-md transition-all duration-150 ${
              selectedUser?._id === u._id
                ? "bg-zinc-800 ring-1 ring-zinc-700"
                : "hover:bg-zinc-800/60"
            }`}
          >
            <div className="relative flex-shrink-0">
              <img
                src={u.profilePic || noUser}
                alt={u.fullName}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-zinc-700"
              />
              {onlineUsers.includes(u._id) && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-[#0d0d0d]" />
              )}
            </div>

            <div className="hidden lg:flex flex-col items-start min-w-0">
              <span className="text-sm text-zinc-100 truncate">{u.fullName}</span>
              <span
                className={`text-xs ${
                  onlineUsers.includes(u._id)
                    ? "text-green-400"
                    : "text-zinc-500"
                }`}
              >
                {onlineUsers.includes(u._id) ? "Online" : "Offline"}
              </span>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <p className="text-center text-zinc-500 text-xs py-3">No Users</p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
