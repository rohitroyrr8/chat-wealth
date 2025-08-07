import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import MainContent from "@/components/dashboard/MainContent";
import RightSidebar from "@/components/dashboard/RightSidebar";
import SettingsModal from "@/components/dashboard/SettingsModal";

const Dashboard = () => {
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleNewChat = () => {
    // Generate a new chat ID and navigate to it
    const newChatId = `new-chat-${Date.now()}`;
    navigate(`/chat/${newChatId}`);
  };

  const handleChatSelect = (chatTitle: string) => {
    // Convert chat title to ID format for URL
    const chatId = chatTitle.toLowerCase().replace(/\s+/g, "-");
    navigate(`/chat/${chatId}`);
  };

  const handleBackToDashboard = () => {
    // Already on dashboard, no action needed
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        onNewChat={handleNewChat} 
        onSettingsClick={() => setSettingsOpen(true)}
        onChatSelect={handleChatSelect}
        activeChatTitle=""
        onBackToDashboard={handleBackToDashboard}
      />
      <MainContent />
      <RightSidebar />
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
};

export default Dashboard;