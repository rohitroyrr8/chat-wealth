import { useState } from "react";
import { X, Settings as SettingsIcon, Bell, Zap, Shield, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/ui/theme-provider";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const { theme, setTheme } = useTheme();

  const tabs = [
    { id: "general", label: "General", icon: SettingsIcon },
    { id: "notification", label: "Notification", icon: Bell },
    { id: "connector", label: "Connector", icon: Zap },
    { id: "security", label: "Security", icon: Shield },
    { id: "account", label: "Account", icon: User },
  ];

  const handleClose = () => {
    window.history.back();
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <div className="w-80 bg-card p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-semibold text-foreground">Settings</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === "general" && (
          <div className="max-w-2xl space-y-8">
            {/* Theme Section */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Theme</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Select your preferred theme for the application.
                </p>
              </div>
              
              <div className="flex space-x-4">
                {["light", "dark", "system"].map((themeOption) => (
                  <label
                    key={themeOption}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="theme"
                      value={themeOption}
                      checked={theme === themeOption}
                      onChange={(e) => setTheme(e.target.value as any)}
                      className="w-4 h-4 text-primary border-muted-foreground focus:ring-primary"
                    />
                    <span className="text-sm font-medium text-foreground capitalize">
                      {themeOption}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Language Section */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="language" className="text-lg font-medium text-foreground">
                  Language
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Choose the display language for the application.
                </p>
              </div>
              
              <Select defaultValue="english">
                <SelectTrigger className="w-full max-w-xs bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Spoken Language Section */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="spoken-language" className="text-lg font-medium text-foreground">
                  Spoken Language
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Select the language for AI voice responses.
                </p>
              </div>
              
              <Select defaultValue="english-us">
                <SelectTrigger className="w-full max-w-xs bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english-us">English (US)</SelectItem>
                  <SelectItem value="english-uk">English (UK)</SelectItem>
                  <SelectItem value="spanish-es">Spanish (ES)</SelectItem>
                  <SelectItem value="french-fr">French (FR)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Follow-up Questions Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="follow-up" className="text-lg font-medium text-foreground">
                    Allow Follow-up Questions
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Enable or disable the AI's ability to ask clarifying follow-up questions.
                  </p>
                </div>
                <Switch id="follow-up" defaultChecked />
              </div>
            </div>
          </div>
        )}

        {activeTab === "notification" && (
          <div className="max-w-2xl">
            <h3 className="text-lg font-medium text-foreground mb-4">Notification Settings</h3>
            <p className="text-muted-foreground">Notification settings will be implemented here.</p>
          </div>
        )}

        {activeTab === "connector" && (
          <div className="max-w-2xl">
            <h3 className="text-lg font-medium text-foreground mb-4">Connector Settings</h3>
            <p className="text-muted-foreground">Connector settings will be implemented here.</p>
          </div>
        )}

        {activeTab === "security" && (
          <div className="max-w-2xl">
            <h3 className="text-lg font-medium text-foreground mb-4">Security Settings</h3>
            <p className="text-muted-foreground">Security settings will be implemented here.</p>
          </div>
        )}

        {activeTab === "account" && (
          <div className="max-w-2xl">
            <h3 className="text-lg font-medium text-foreground mb-4">Account Settings</h3>
            <p className="text-muted-foreground">Account settings will be implemented here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;