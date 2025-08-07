import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTheme } from "@/components/ui/theme-provider";
import { 
  MessageCircle, 
  LayoutDashboard, 
  Settings, 
  HelpCircle,
  Plus,
  Sparkles,
  Monitor,
  Moon,
  Sun,
  LogOut,
  Compass,
  PanelLeft,
  PanelLeftOpen
} from "lucide-react";

interface SidebarProps {
  onNewChat: () => void;
  onSettingsClick: () => void;
  onChatSelect: (chatTitle: string) => void;
  activeChatTitle: string;
  onBackToDashboard: () => void;
  onExploreClick?: () => void;
}

const Sidebar = ({ onNewChat, onSettingsClick, onChatSelect, activeChatTitle, onBackToDashboard, onExploreClick }: SidebarProps) => {
  const { theme, setTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const savedChats = [
    "Investment Strategy",
    "Budget Planning", 
    "Retirement Goals"
  ];

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} bg-sidebar h-screen flex flex-col transition-all duration-300 ease-in-out`}>
      {/* Toggle Button */}
      <div className="p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent h-10"
        >
          {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
          {!isCollapsed && <span className="ml-2">Close sidebar</span>}
        </Button>
      </div>

      {/* Header */}
      {!isCollapsed && (
        <div className="px-6 pb-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-sidebar-foreground">FinAI</span>
          </div>
          
          <Button 
            onClick={onNewChat}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-xl"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>
      )}

      {/* Collapsed Header - Just the New Chat Button */}
      {isCollapsed && (
        <div className="px-2 pb-4">
          <Button 
            onClick={onNewChat}
            size="sm"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-2"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Saved Chats */}
      <div className={`flex-1 ${isCollapsed ? 'px-2' : 'p-4'}`}>
        {!isCollapsed && (
          <div className="mb-6">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              SAVED CHATS
            </h3>
            <div className="space-y-1">
              {savedChats.map((chat) => (
                <button
                  key={chat}
                  onClick={() => onChatSelect(chat)}
                  className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 hover:bg-sidebar-accent ${
                    activeChatTitle === chat ? 'bg-sidebar-accent' : ''
                  }`}
                >
                  <MessageCircle className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-sidebar-foreground">{chat}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Collapsed Saved Chats - Just Icons */}
        {isCollapsed && (
          <div className="mb-4 space-y-1">
            {savedChats.map((chat) => (
              <button
                key={chat}
                onClick={() => onChatSelect(chat)}
                className={`w-full p-3 rounded-lg transition-colors flex items-center justify-center hover:bg-sidebar-accent ${
                  activeChatTitle === chat ? 'bg-sidebar-accent' : ''
                }`}
                title={chat}
              >
                <MessageCircle className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        )}

        {/* Tools */}
        <div>
          {!isCollapsed && (
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              TOOLS
            </h3>
          )}
          <div className="space-y-1">
            <button 
              onClick={onExploreClick}
              className={`w-full ${isCollapsed ? 'p-3 justify-center' : 'text-left p-3'} rounded-lg transition-colors flex items-center gap-3 hover:bg-sidebar-accent`}
              title={isCollapsed ? "Explore" : ""}
            >
              <Compass className="w-4 h-4 text-sidebar-primary" />
              {!isCollapsed && <span className="text-sm text-sidebar-foreground">Explore</span>}
            </button>
            <button 
              onClick={onBackToDashboard}
              className={`w-full ${isCollapsed ? 'p-3 justify-center' : 'text-left p-3'} rounded-lg transition-colors flex items-center gap-3 ${
                !activeChatTitle ? 'bg-sidebar-accent' : 'hover:bg-sidebar-accent'
              }`}
              title={isCollapsed ? "Dashboard" : ""}
            >
              <LayoutDashboard className="w-4 h-4 text-sidebar-primary" />
              {!isCollapsed && <span className="text-sm text-sidebar-foreground">Dashboard</span>}
            </button>
            <button 
              onClick={onSettingsClick}
              className={`w-full ${isCollapsed ? 'p-3 justify-center' : 'text-left p-3'} rounded-lg transition-colors flex items-center gap-3 hover:bg-sidebar-accent`}
              title={isCollapsed ? "Settings" : ""}
            >
              <Settings className="w-4 h-4 text-muted-foreground" />
              {!isCollapsed && <span className="text-sm text-sidebar-foreground">Settings</span>}
            </button>
            <button 
              className={`w-full ${isCollapsed ? 'p-3 justify-center' : 'text-left p-3'} rounded-lg transition-colors flex items-center gap-3 hover:bg-sidebar-accent`}
              title={isCollapsed ? "Help & Support" : ""}
            >
              <HelpCircle className="w-4 h-4 text-muted-foreground" />
              {!isCollapsed && <span className="text-sm text-sidebar-foreground">Help & Support</span>}
            </button>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className={`${isCollapsed ? 'p-2' : 'p-4'}`}>
        <Popover>
          <PopoverTrigger asChild>
            <button className={`w-full flex items-center ${isCollapsed ? 'justify-center p-2' : 'gap-3 p-2'} rounded-lg hover:bg-sidebar-accent transition-colors`}>
              <Avatar className="w-10 h-10">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground">RR</AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-sidebar-foreground">Rohit Roy</div>
                  <div className="text-xs text-muted-foreground">roy@example.com</div>
                </div>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0 mb-4 border-0 shadow-lg" side="top" align="end">
            <div className="p-4 space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Rohit Roy</p>
                <p className="text-xs text-muted-foreground">roy@example.com</p>
              </div>
              
              {/* <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Theme</p>
                <div className="grid grid-cols-3 gap-1">
                  <Button
                    variant={theme === "light" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setTheme("light")}
                    className="h-8 px-2"
                  >
                    <Sun className="h-3 w-3 mr-1" />
                    Light
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setTheme("dark")}
                    className="h-8 px-2"
                  >
                    <Moon className="h-3 w-3 mr-1" />
                    Dark
                  </Button>
                  <Button
                    variant={theme === "system" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setTheme("system")}
                    className="h-8 px-2"
                  >
                    <Monitor className="h-3 w-3 mr-1" />
                    Auto
                  </Button>
                </div>
              </div> */}

              <div className="space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => console.log("Upgrade Plan clicked")}
                  className="w-full justify-start"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Upgrade Plan
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSettingsClick}
                  className="w-full justify-start"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => console.log("Help & Support clicked")}
                  className="w-full justify-start"
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help & Support
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => console.log("Share Feedback clicked")}
                  className="w-full justify-start"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Share Feedback
                </Button>
              </div>

              <div className="pt-2 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => console.log("Logout clicked")}
                  className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Sidebar;