import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import ChatInterface from "@/components/dashboard/ChatInterface";
import SettingsModal from "@/components/dashboard/SettingsModal";

const Chat = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Map chat IDs to titles (in a real app, this would come from an API)
  const chatTitles: { [key: string]: string } = {
    "investment-strategy": "Investment Strategy",
    "budget-planning": "Budget Planning", 
    "retirement-goals": "Retirement Goals"
  };

  const chatTitle = chatTitles[chatId || ""] || "Unknown Chat";

  useEffect(() => {
    // If chatId doesn't exist in our known chats, redirect to dashboard
    if (chatId && !chatTitles[chatId]) {
      navigate("/dashboard");
    }
  }, [chatId, navigate]);

  const handleNewChat = () => {
    // Navigate to new chat page
    navigate("/new");
  };

  const handleChatSelect = (chatTitle: string) => {
    // Convert chat title to ID format for URL
    const chatId = chatTitle.toLowerCase().replace(/\s+/g, "-");
    navigate(`/chat/${chatId}`);
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const handleExploreClick = () => {
    navigate("/explore");
  };

  if (!chatId) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        onNewChat={handleNewChat}
        onSettingsClick={() => setIsSettingsOpen(true)}
        onChatSelect={handleChatSelect}
        activeChatTitle={chatTitle}
        onBackToDashboard={handleBackToDashboard}
        onExploreClick={handleExploreClick}
      />
      
      <div className="flex-1">
        <ChatInterface chatTitle={chatTitle} />
      </div>

      <SettingsModal
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
      />
    </div>
  );
};

export default Chat;