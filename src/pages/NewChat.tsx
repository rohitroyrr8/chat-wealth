import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic, Paperclip, Globe } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import SettingsModal from "@/components/dashboard/SettingsModal";

const NewChat = () => {
  const [message, setMessage] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const navigate = useNavigate();

  const suggestedPrompts = [
    "Help me create a budget for my monthly expenses",
    "What's the best investment strategy for a beginner?",
    "How can I improve my credit score quickly?"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Create a new chat with this message and navigate to it
    const newChatId = `chat-${Date.now()}`;
    navigate(`/chat/${newChatId}`, { 
      state: { initialMessage: message } 
    });
  };

  const handlePromptClick = (prompt: string) => {
    setMessage(prompt);
  };

  const handleNewChat = () => {
    // Already on new chat page, just clear the message
    setMessage("");
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

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        onNewChat={handleNewChat}
        onSettingsClick={() => setIsSettingsOpen(true)}
        onChatSelect={handleChatSelect}
        activeChatTitle=""
        onBackToDashboard={handleBackToDashboard}
        onExploreClick={handleExploreClick}
      />
      
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              What's on your mind today?
            </h1>
            <p className="text-lg text-muted-foreground">
              Ask anything about your finances, investments, or money management
            </p>
          </div>

          {/* Main Chat Input */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex items-center gap-3 bg-muted/30 rounded-xl border border-border p-4 shadow-sm">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask anything or @mention a Space"
                  className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground text-base"
                />
                <div className="flex items-center gap-2">
                  <Button type="button" variant="ghost" size="sm" className="h-9 w-9 p-0">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="h-9 w-9 p-0">
                    <Globe className="w-4 h-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="h-9 w-9 p-0">
                    <Mic className="w-4 h-4" />
                  </Button>
                  <Button 
                    type="submit" 
                    size="sm" 
                    className="h-9 w-9 p-0 bg-primary hover:bg-primary/90"
                    disabled={!message.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </form>

            {/* Suggested Prompts */}
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground text-center">
                Or try one of these suggestions:
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {suggestedPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handlePromptClick(prompt)}
                    className="bg-muted/20 hover:bg-muted/40 text-sm py-2 px-4 h-auto whitespace-normal text-center max-w-xs"
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <SettingsModal
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
      />
    </div>
  );
};

export default NewChat;