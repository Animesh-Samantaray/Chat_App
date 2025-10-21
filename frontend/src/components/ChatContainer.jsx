import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore.js";
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import MessageSkeleton from "./MessageSkeleton.jsx";
import noUser from "../pages/noUser.png";
import { useAuthStore } from "../store/useAuthStore.js";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser,subscribeToMessages ,unSubscribeFromMessages} = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef();

  useEffect(() => {
    
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();

      return()=>unSubscribeFromMessages();
    }
  }, [selectedUser._id, getMessages,unSubscribeFromMessages,subscribeToMessages]);

useEffect(() => {
  if (messageEndRef.current) {
    
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [messages]);


  if (isMessagesLoading || !messages) {
    return (
      <div className="flex flex-col h-full bg-[#0f0f0f] text-white">
        <ChatHeader />
        <div className="overflow-y-auto">
          <MessageSkeleton />
        </div>
        <div className="border-t border-zinc-800">
          <MessageInput />
        </div>
      </div>
    );
  }

  // Main chat layout (Tailwind-only)
  return (
    <div className="flex-1 flex flex-col overflow-auto bg-[#0f0f0f] text-white">
      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isOwnMessage = message.senderId === authUser._id;
          const avatarSrc = isOwnMessage
            ? authUser.profilePic || noUser
            : selectedUser.profilePic || noUser;

          return (
            <div
              key={message._id}
              className={`flex items-start gap-3 ${
                isOwnMessage ? "justify-end" : "justify-start"
              }`}
              // ref={messageEndRef}
            >
              {/* Avatar */}
              {!isOwnMessage && (
                <img
                  src={avatarSrc}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                />
              )}

              {/* Message bubble */}
              <div
                className={`flex flex-col max-w-xs sm:max-w-sm ${
                  isOwnMessage ? "items-end" : "items-start"
                }`}
              >
                {/* Sender name */}
                <span className="text-xs font-medium text-gray-400 mb-1">
                  {isOwnMessage ? "You" : selectedUser.fullName || "User"}
                </span>

                {/* Message box */}
                <div
                  className={`rounded-2xl px-4 py-2 text-sm shadow-md ${
                    isOwnMessage
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-800 text-gray-100"
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>

                {/* Time */}
                <span className=" text-gray-200 mt-1 font-bold text-[15px]">
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {/* Avatar for your messages (right side) */}
              {isOwnMessage && (
                <img
                  src={avatarSrc}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover border border-zinc-700"
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
