import React from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100 flex pt-16">
      {/* Sidebar */}
      <div className="w-20 lg:w-72 border-r border-zinc-800 bg-zinc-900/90 h-full">
        <Sidebar />
      </div>

      {/* Main Chat Section */}
      <div className="flex-1 flex flex-col bg-zinc-900/80">
        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
      </div>
    </div>
  );
};

export default HomePage;
