import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/components/ui/theme-provider";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
  PanelLeftOpen,
  Search,
  X
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
  const [searchOpen, setSearchOpen] = useState(false);

  // Handle cmd+k keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const savedChats = [
    "Investment Strategy",
    "Budget Planning", 
    "Retirement Goals"
  ];

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} bg-sidebar h-screen flex flex-col transition-all duration-300 ease-in-out`}>
      {/* Header */}
      {!isCollapsed && (
        <div className="px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-sidebar-foreground">FinAI</span>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="text-sidebar-foreground hover:bg-sidebar-accent h-8 w-8 p-0"
                >
                  <PanelLeft className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Close sidebar</p>
              </TooltipContent>
            </Tooltip>
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

      {/* Collapsed Header - Just the Toggle and New Chat Button */}
      {isCollapsed && (
        <div className="px-2 py-6 space-y-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="w-full text-sidebar-foreground hover:bg-sidebar-accent h-10 px-2 justify-center"
              >
                <PanelLeftOpen className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Open sidebar</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={onNewChat}
                size="sm"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-2"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>New Chat</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )}

      {/* Saved Chats */}
      <div className={`flex-1 ${isCollapsed ? 'px-2' : 'p-4'}`}>
        {!isCollapsed && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                SAVED CHATS
              </h3>
            </div>
            
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 bg-sidebar-accent mb-3"
            >
              <Search className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-sidebar-foreground">Search chats</span>
              <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                <span>⌘</span>
                <span>K</span>
              </div>
            </button>
            
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
            {/* Search Button - Collapsed */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setSearchOpen(true)}
                  className="w-full p-3 rounded-lg transition-colors flex items-center justify-center hover:bg-sidebar-accent"
                >
                  <Search className="w-4 h-4 text-muted-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Search chats (⌘K)</p>
              </TooltipContent>
            </Tooltip>
            {savedChats.map((chat) => (
              <Tooltip key={chat}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onChatSelect(chat)}
                    className={`w-full p-3 rounded-lg transition-colors flex items-center justify-center hover:bg-sidebar-accent ${
                      activeChatTitle === chat ? 'bg-sidebar-accent' : ''
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 text-muted-foreground" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{chat}</p>
                </TooltipContent>
              </Tooltip>
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
            {isCollapsed ? (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      onClick={onExploreClick}
                      className="w-full p-3 justify-center rounded-lg transition-colors flex items-center hover:bg-sidebar-accent"
                    >
                      <Compass className="w-4 h-4 text-sidebar-primary" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Explore</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      onClick={onBackToDashboard}
                      className={`w-full p-3 justify-center rounded-lg transition-colors flex items-center ${
                        !activeChatTitle ? 'bg-sidebar-accent' : 'hover:bg-sidebar-accent'
                      }`}
                    >
                      <LayoutDashboard className="w-4 h-4 text-sidebar-primary" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Dashboard</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      onClick={onSettingsClick}
                      className="w-full p-3 justify-center rounded-lg transition-colors flex items-center hover:bg-sidebar-accent"
                    >
                      <Settings className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Settings</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      className="w-full p-3 justify-center rounded-lg transition-colors flex items-center hover:bg-sidebar-accent"
                    >
                      <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Help & Support</p>
                  </TooltipContent>
                </Tooltip>
              </>
            ) : (
              <>
                <button 
                  onClick={onExploreClick}
                  className="w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 hover:bg-sidebar-accent"
                >
                  <Compass className="w-4 h-4 text-sidebar-primary" />
                  <span className="text-sm text-sidebar-foreground">Explore</span>
                </button>
                <button 
                  onClick={onBackToDashboard}
                  className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 ${
                    !activeChatTitle ? 'bg-sidebar-accent' : 'hover:bg-sidebar-accent'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-sidebar-primary" />
                  <span className="text-sm text-sidebar-foreground">Dashboard</span>
                </button>
                <button 
                  onClick={onSettingsClick}
                  className="w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 hover:bg-sidebar-accent"
                >
                  <Settings className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-sidebar-foreground">Settings</span>
                </button>
                <button 
                  className="w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 hover:bg-sidebar-accent"
                >
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-sidebar-foreground">Help & Support</span>
                </button>
              </>
            )}
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

      {/* Search Dialog */}
      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <div className="flex items-center border-b px-3">
          <CommandInput placeholder="Search chats..." className="flex-1" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchOpen(false)}
            className="ml-2 h-6 w-6 p-0 hover:bg-muted"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
        <CommandList className="max-h-[300px] overflow-y-auto p-2">
          <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
            No chats found.
          </CommandEmpty>
          <CommandGroup>
            {savedChats.map((chat) => (
              <CommandItem
                key={chat}
                onSelect={() => {
                  onChatSelect(chat);
                  setSearchOpen(false);
                }}
                className="flex items-center gap-3 px-2 py-3 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{chat}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default Sidebar;