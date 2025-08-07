import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import MainContent from "@/components/dashboard/MainContent";
import RightSidebar from "@/components/dashboard/RightSidebar";
import SettingsModal from "@/components/dashboard/SettingsModal";
import ChatInterface from "@/components/dashboard/ChatInterface";

const Dashboard = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [currentView, setCurrentView] = useState<"dashboard" | "chat">("dashboard");
  const [activeChatTitle, setActiveChatTitle] = useState<string>("");

  const handleNewChat = () => {
    setCurrentView("chat");
    setActiveChatTitle("New Chat");
  };

  const handleChatSelect = (chatTitle: string) => {
    setCurrentView("chat");
    setActiveChatTitle(chatTitle);
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
    setActiveChatTitle("");
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        onNewChat={handleNewChat} 
        onSettingsClick={() => setSettingsOpen(true)}
        onChatSelect={handleChatSelect}
        activeChatTitle={activeChatTitle}
        onBackToDashboard={handleBackToDashboard}
      />
      {currentView === "dashboard" ? <MainContent /> : <ChatInterface chatTitle={activeChatTitle} />}
      <RightSidebar />
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
};

export default Dashboard;