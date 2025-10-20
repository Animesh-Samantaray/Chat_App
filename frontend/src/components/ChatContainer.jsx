import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore.js";
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import MessageSkeleton from "./MessageSkeleton.jsx";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore();

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser?._id, getMessages]);

  // Loading / Skeleton UI
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

  // Main chat layout
  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] text-white">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 ">

      </div>

      {/* Message Input */}
      <div className="border-t border-zinc-800">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
