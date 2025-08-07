import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Mic, Paperclip, Globe, Copy, Share, Volume2 } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatInterfaceProps {
  chatTitle: string;
}

const ChatInterface = ({ chatTitle }: ChatInterfaceProps) => {
  const [message, setMessage] = useState("");
  const [messages] = useState<Message[]>([
    {
      id: "1",
      content: "I'm looking to create a diversified investment portfolio. What should I consider for someone in their early 30s with moderate risk tolerance?",
      role: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      id: "2", 
      content: "For someone in their early 30s with moderate risk tolerance, here's a structured approach to building a diversified portfolio:\n\n**Asset Allocation Strategy:**\n• 70-80% Stocks (mix of domestic and international)\n• 15-25% Bonds (government and corporate)\n• 5-10% Alternative investments (REITs, commodities)\n\n**Key Considerations:**\n1. **Time Horizon**: You have 30+ years until retirement, allowing for growth-focused investments\n2. **Emergency Fund**: Maintain 3-6 months of expenses in high-yield savings\n3. **Tax-Advantaged Accounts**: Maximize 401(k) employer match and consider Roth IRA\n4. **Low-Cost Index Funds**: Focus on broad market exposure with minimal fees\n\n**Sample Portfolio:**\n• 40% Total Stock Market Index\n• 20% International Developed Markets\n• 10% Emerging Markets\n• 20% Bond Index Fund\n• 10% REITs\n\nWould you like me to help you analyze your current financial situation or discuss specific investment vehicles?",
      role: "assistant",
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
    },
    {
      id: "3",
      content: "That's helpful! What about ESG investing? I want my investments to align with my values while still maintaining good returns.",
      role: "user", 
      timestamp: new Date(Date.now() - 1000 * 60 * 1),
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    console.log("Sending message:", message);
    setMessage("");
  };

  return (
    <div className="flex-1 bg-background flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-semibold text-foreground">{chatTitle}</h1>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {messages.map((msg) => (
            <div key={msg.id} className="space-y-4">
              {msg.role === "user" ? (
                <div className="flex justify-end">
                  <div className="bg-muted/50 rounded-2xl px-4 py-3 max-w-2xl">
                    <p className="text-foreground whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="prose prose-sm max-w-none">
                    <p className="text-foreground whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Share className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center gap-3 bg-muted/30 rounded-xl border border-border p-3">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask anything about your finances..."
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
              />
              <div className="flex items-center gap-2">
                <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Globe className="w-4 h-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Mic className="w-4 h-4" />
                </Button>
                <Button 
                  type="submit" 
                  size="sm" 
                  className="h-8 w-8 p-0 bg-primary hover:bg-primary/90"
                  disabled={!message.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;