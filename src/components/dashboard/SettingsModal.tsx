import { useState } from "react";
import { X, Settings as SettingsIcon, Bell, Zap, Shield, User, Github, Mail, Calendar, FileText, Database, MessageSquare, Cloud, HardDrive } from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/components/ui/theme-provider";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsModal = ({ open, onOpenChange }: SettingsModalProps) => {
  const [activeTab, setActiveTab] = useState("general");
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const { theme, setTheme } = useTheme();

  const tabs = [
    { id: "general", label: "General", icon: SettingsIcon },
    { id: "notification", label: "Notification", icon: Bell },
    { id: "connector", label: "Connector", icon: Zap },
    { id: "security", label: "Security", icon: Shield },
    { id: "account", label: "Account", icon: User },
    { id: "billing", label: "Billing", icon: FileText },
  ];

  const connectors = [
    { name: "Box", icon: Database, connected: false },
    { name: "Canva", icon: FileText, connected: false },
    { name: "Dropbox", icon: Cloud, connected: true },
    { name: "GitHub", icon: Github, connected: true },
    { name: "Gmail", icon: Mail, connected: false },
    { name: "Google Calendar", icon: Calendar, connected: false },
    { name: "Google Contacts", icon: MessageSquare, connected: false },
    { name: "Google Drive", icon: HardDrive, connected: true },
    { name: "HubSpot", icon: Database, connected: false },
    { name: "Linear", icon: FileText, connected: false },
    { name: "Notion", icon: FileText, connected: false },
    { name: "Outlook Calendar", icon: Calendar, connected: false },
    { name: "Outlook Email", icon: Mail, connected: false },
    { name: "SharePoint", icon: Database, connected: false },
    { name: "Teams", icon: MessageSquare, connected: false },
  ];


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[70vh] p-0 overflow-hidden">
        <div className="flex h-full">
          {/* Left Sidebar */}
          <div className="w-64 bg-muted/30 p-4">
            <DialogHeader className="mb-6">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold text-foreground">Settings</h1>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onOpenChange(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </DialogHeader>
            
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
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
          <div className="flex-1 p-6 overflow-y-auto max-h-full">
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
                          className="w-4 h-4 text-primary focus:ring-primary"
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

            {activeTab === "account" && (
              <div className="max-w-2xl space-y-8 pb-6">
                {/* Current Plan */}
                <Card>
                  <CardHeader>
                    <CardTitle>Your Current Plan</CardTitle>
                    <CardDescription>
                      You are currently on the Premium Plan. Enjoy unlimited chats, advanced insights, and priority support.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold">Premium Plan</h4>
                        <Badge>Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Access to all features, including real-time market data and personalized financial planning.
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li>• Unlimited Chat History</li>
                        <li>• Advanced Portfolio Analysis</li>
                        <li>• Priority Customer Support</li>
                      </ul>
                      <Button className="mt-4">Manage Plan</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Account Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account Details</CardTitle>
                    <CardDescription>
                      Update your personal information and account settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value="john.doe@example.com" disabled className="bg-muted" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="email-feedback" defaultChecked />
                      <Label htmlFor="email-feedback" className="text-sm">
                        Receive email notifications for feedback sharing
                      </Label>
                    </div>
                    <div className="pt-4">
                      <Button variant="outline">Change Password</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Delete Account */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-destructive">Delete Account</CardTitle>
                    <CardDescription>
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="destructive">Delete Account</Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "connector" && (
              <div className="max-w-4xl space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Connectors</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect your favorite apps so FinAI can access their information, based on what you're authorized to view.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-6">
                  {connectors.map((connector) => {
                    const Icon = connector.icon;
                    return (
                      <Card key={connector.name} className="relative">
                        <CardContent className="p-6 text-center">
                          <Icon className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
                          <h4 className="font-medium mb-2">{connector.name}</h4>
                          {connector.connected && (
                            <Badge variant="secondary" className="absolute top-2 right-2">
                              Connected
                            </Badge>
                          )}
                          <Button 
                            variant={connector.connected ? "outline" : "default"} 
                            size="sm"
                            className="mt-2"
                          >
                            {connector.connected ? "Disconnect" : "Connect"}
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "notification" && (
              <div className="max-w-2xl space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Responses</h4>
                      <p className="text-sm text-muted-foreground">
                        Get notified when FinAI responds to requests that take time, like research or analysis.
                      </p>
                    </div>
                    <Select defaultValue="push">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="push">Push</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Tasks</h4>
                      <p className="text-sm text-muted-foreground">
                        Get notified when tasks you've created have updates.
                      </p>
                    </div>
                    <Select defaultValue="push-email">
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="push-email">Push, Email</SelectItem>
                        <SelectItem value="push">Push</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "billing" && (
              <div className="max-w-2xl">
                <h3 className="text-lg font-medium text-foreground mb-4">Billing</h3>
                <p className="text-muted-foreground">Billing settings will be implemented here.</p>
              </div>
            )}

            {activeTab === "security" && (
              <div className="max-w-2xl space-y-8">
                {/* Multi-factor Authentication */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Multi-factor authentication</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Require an extra security challenge when logging in. If you are unable to pass this challenge, you will have the option to recover your account via email.
                    </p>
                  </div>
                  <Switch checked={mfaEnabled} onCheckedChange={setMfaEnabled} />
                </div>

                {/* Device Management */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Log out of this device</h4>
                    <Button variant="outline">Log out</Button>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Log out of all devices</h4>
                      <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                        Log out all
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Log out of all active sessions across all devices, including your current session. It may take up to 30 minutes for other devices to be logged out.
                    </p>
                  </div>
                </div>

                {/* Secure Sign In */}
                <Card>
                  <CardHeader>
                    <CardTitle>Secure sign in with FinAI</CardTitle>
                    <CardDescription>
                      Sign in to websites and apps across the internet with the trusted security of FinAI.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground">
                      You haven't used FinAI to sign into any websites or apps yet. Once you do, they'll show up here.
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;