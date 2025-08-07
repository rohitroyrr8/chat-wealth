import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import MainContent from "@/components/dashboard/MainContent";
import RightSidebar from "@/components/dashboard/RightSidebar";
import SettingsModal from "@/components/dashboard/SettingsModal";

const Dashboard = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleNewChat = () => {
    console.log("Starting new chat...");
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar onNewChat={handleNewChat} onSettingsClick={() => setSettingsOpen(true)} />
      <MainContent />
      <RightSidebar />
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
};

export default Dashboard;