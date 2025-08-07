import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageCircle, 
  LayoutDashboard, 
  Settings, 
  HelpCircle,
  Plus,
  Sparkles
} from "lucide-react";

interface SidebarProps {
  onNewChat: () => void;
}

const Sidebar = ({ onNewChat }: SidebarProps) => {
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const savedChats = [
    "Investment Strategy",
    "Budget Planning", 
    "Retirement Goals"
  ];

  return (
    <div className="w-64 bg-sidebar h-screen flex flex-col border-r border-sidebar-border">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-sidebar-foreground">FinAI</span>
        </div>
        
        <Button 
          onClick={onNewChat}
          className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 h-12 rounded-xl"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>

      {/* Saved Chats */}
      <div className="flex-1 p-4">
        <div className="mb-6">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            SAVED CHATS
          </h3>
          <div className="space-y-1">
            {savedChats.map((chat) => (
              <button
                key={chat}
                onClick={() => setActiveChat(chat)}
                className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 hover:bg-sidebar-accent ${
                  activeChat === chat ? 'bg-sidebar-accent' : ''
                }`}
              >
                <MessageCircle className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-sidebar-foreground">{chat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div>
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            TOOLS
          </h3>
          <div className="space-y-1">
            <button className="w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 bg-sidebar-accent">
              <LayoutDashboard className="w-4 h-4 text-sidebar-primary" />
              <span className="text-sm text-sidebar-foreground">Dashboard</span>
            </button>
            <button className="w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 hover:bg-sidebar-accent">
              <Settings className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-sidebar-foreground">Settings</span>
            </button>
            <button className="w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 hover:bg-sidebar-accent">
              <HelpCircle className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-sidebar-foreground">Help & Support</span>
            </button>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="" />
            <AvatarFallback className="bg-gradient-primary text-white">JD</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-sidebar-foreground">John Doe</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;