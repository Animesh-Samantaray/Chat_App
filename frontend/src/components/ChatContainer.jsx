import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import MessageSkeleton from "./MessageSkeleton.jsx";
import noUser from "../pages/noUser.png";

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

  // Fetch messages when selected user changes
  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
      return () => unSubscribeFromMessages();
    }
  }, [selectedUser?._id, getMessages, subscribeToMessages, unSubscribeFromMessages]);

  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading || !messages) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1f1f1f] text-white">
        <ChatHeader />
        <div className="flex-1 overflow-y-auto">
          <MessageSkeleton />
        </div>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1f1f1f] text-white">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-gradient-to-b from-[#0a0a0a]/90 to-[#111111]/50 backdrop-blur-sm border-b border-zinc-800">
        <ChatHeader />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-2 py-2 pb-24 flex flex-col gap-2 sm:gap-3">
        {messages.map((m) => {
          const isOwn = m.senderId === authUser._id;
          const avatar = isOwn
            ? authUser.profilePic || noUser
            : selectedUser.profilePic || noUser;

          return (
            <div
              key={m._id}
              className={`flex items-end gap-1 sm:gap-2 ${
                isOwn ? "justify-end" : "justify-start"
              }`}
            >
              {!isOwn && (
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-7 h-7 rounded-full border border-zinc-700 sm:w-9 sm:h-9"
                />
              )}

              <div
                className={`flex flex-col ${
                  isOwn ? "items-end" : "items-start"
                } max-w-[85%] sm:max-w-[70%]`}
              >
                <div
                  className={`px-3 py-2 rounded-2xl text-[12px] sm:text-sm leading-relaxed ${
                    isOwn
                      ? "bg-gradient-to-br from-green-500 to-green-700 text-white rounded-tr-sm shadow-md"
                      : "bg-[#1a1a1a]/80 text-gray-100 rounded-tl-sm shadow-sm"
                  }`}
                >
                  {m.image && (
                    <img
                      src={m.image}
                      alt="attachment"
                      className="max-w-[140px] sm:max-w-[180px] rounded-lg mb-1"
                    />
                  )}
                  {m.text && <p>{m.text}</p>}
                </div>

                <span className="text-[10px] text-gray-400 mt-1 px-1">
                  {new Date(m.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {isOwn && (
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-7 h-7 rounded-full border border-zinc-700 sm:w-9 sm:h-9"
                />
              )}
            </div>
          );
        })}

        {/* Scroll anchor */}
        <div ref={messageEndRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-gradient-to-t from-[#0a0a0a]/95 to-[#111111]/50 backdrop-blur-md border-t border-zinc-800">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
