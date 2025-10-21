import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore.js";
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import MessageSkeleton from "./MessageSkeleton.jsx";
import noUser from "../pages/noUser.png";
import { useAuthStore } from "../store/useAuthStore.js";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unSubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef();

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
      return () => unSubscribeFromMessages();
    }
  }, [selectedUser?._id, getMessages, subscribeToMessages, unSubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading || !messages) {
    return (
      <div className="flex flex-col h-full bg-[#0f0f0f] text-white">
        <ChatHeader />
        <div className="flex-1 overflow-y-auto">
          <MessageSkeleton />
        </div>
        <div className="border-t border-zinc-800">
          <MessageInput />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#0f0f0f] text-white">
      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
        {messages.map((message) => {
          const isOwnMessage = message.senderId === authUser._id;
          const avatarSrc = isOwnMessage
            ? authUser.profilePic || noUser
            : selectedUser.profilePic || noUser;

          return (
            <div
              key={message._id}
              className={`flex items-end gap-3 ${
                isOwnMessage ? "justify-end" : "justify-start"
              }`}
            >
              {/* Received avatar */}
              {!isOwnMessage && (
                <img
                  src={avatarSrc}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover border border-zinc-700 hover:scale-150 transition-transform duration-300 z-10"
                />
              )}

              <div className="relative flex flex-col max-w-[60%]">
                <div
                  className={`p-3 rounded-2xl text-sm break-words ${
                    isOwnMessage
                      ? "bg-gradient-to-r from-purple-700 to-purple-500 text-white shadow-md rounded-tr-sm"
                      : "bg-zinc-800 text-gray-100 shadow-md rounded-tl-sm"
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="max-w-[220px] rounded-lg mb-2 cursor-pointer hover:scale-150 hover:shadow-lg transition-transform duration-300 z-20"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>

                {/* Time below the bubble */}
                <span
                  className={`text-xs text-gray-400 font-medium mt-1 ${
                    isOwnMessage ? "text-right" : "text-left"
                  }`}
                >
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {/* Own avatar */}
              {isOwnMessage && (
                <img
                  src={avatarSrc}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover border border-zinc-700 hover:scale-150 transition-transform duration-300 z-10"
                />
              )}
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
