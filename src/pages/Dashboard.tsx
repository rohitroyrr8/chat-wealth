import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import MainContent from "@/components/dashboard/MainContent";
import RightSidebar from "@/components/dashboard/RightSidebar";

const Dashboard = () => {
  const handleNewChat = () => {
    console.log("Starting new chat...");
    // Logic to start a new chat
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar onNewChat={handleNewChat} />
      <MainContent />
      <RightSidebar />
    </div>
  );
};

export default Dashboard;