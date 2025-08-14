import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Mic, Paperclip, Globe, Copy, Share, Volume2, MessageCircle, Bot } from "lucide-react";
import { getChat, addMessageToChat } from "@/lib/chatStorage";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatInterfaceProps {
  chatTitle: string;
  chatId: string;
}

const ChatInterface = ({ chatTitle, chatId }: ChatInterfaceProps) => {
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState<"chat" | "agent">("chat");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

  useEffect(() => {
    const chatData = getChat(chatId);
    if (chatData) {
      setMessages(chatData.messages);
      // If there's only one user message and no assistant response, show waiting state
      if (chatData.messages.length === 1 && chatData.messages[0].role === "user") {
        setIsWaitingForResponse(true);
      }
    }
  }, [chatId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const userMessage = message;
    
    // Add user message to chat
    addMessageToChat(chatId, {
      content: userMessage,
      role: "user"
    });
    
    // Update local state
    const chatData = getChat(chatId);
    if (chatData) {
      setMessages(chatData.messages);
    }
    
    setMessage("");
    setIsWaitingForResponse(true);
    
    try {
      // Send to webhook
      const webhookUrl = `http://localhost:5678/webhook/bd5fe1bb-69f7-4b4d-ae34-f76da100d260?message=${encodeURIComponent(userMessage)}`;
      console.log('Sending request to:', webhookUrl);
      
      const response = await fetch(webhookUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors', // Enable CORS
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Response data:', data);
      
      const aiResponse = data.output || "Sorry, I couldn't process your request.";
      
      // Add AI response to chat
      addMessageToChat(chatId, {
        content: aiResponse,
        role: "assistant"
      });
      
      // Update local state
      const updatedChatData = getChat(chatId);
      if (updatedChatData) {
        setMessages(updatedChatData.messages);
      }
    } catch (error) {
      console.error('Error calling webhook:', error);
      
      // Add error message to chat
      addMessageToChat(chatId, {
        content: `Error connecting to AI service: ${error instanceof Error ? error.message : 'Unknown error'}. Please ensure the webhook server is running and accessible.`,
        role: "assistant"
      });
      
      const updatedChatData = getChat(chatId);
      if (updatedChatData) {
        setMessages(updatedChatData.messages);
      }
    } finally {
      setIsWaitingForResponse(false);
    }
  };

  return (
    <div className="flex-1 bg-background flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold text-foreground">{chatTitle}</h1>
            <div className="flex items-center bg-muted rounded-lg p-1 gap-1">
              <Button
                variant={mode === "chat" ? "default" : "ghost"}
                size="sm"
                onClick={() => setMode("chat")}
                className="h-7 px-3 flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Chat
              </Button>
              <Button
                variant={mode === "agent" ? "default" : "ghost"}
                size="sm"
                onClick={() => setMode("agent")}
                className="h-7 px-3 flex items-center gap-1.5"
              >
                <Bot className="w-3.5 h-3.5" />
                Agent
              </Button>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {mode === "chat" ? "Text-based conversation" : "Voice-enabled AI agent"}
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {messages.map((msg) => (
            <div key={msg.id} className="space-y-4">
              {msg.role === "user" ? (
                <div className="flex justify-end">
                  <div className="bg-sidebar-accent rounded-2xl px-4 py-3 max-w-2xl">
                    <p className="text-foreground whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="prose prose-sm max-w-none dark:prose-invert text-foreground leading-relaxed">
                    <ReactMarkdown 
                      rehypePlugins={[rehypeHighlight]}
                      components={{
                        code(props) {
                          const { children, className, ...rest } = props;
                          const match = /language-(\w+)/.exec(className || '');
                          return match ? (
                            <code className="block bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto" {...rest}>
                              {children}
                            </code>
                          ) : (
                            <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...rest}>
                              {children}
                            </code>
                          );
                        },
                        h1: ({children}) => <h1 className="text-2xl font-bold mb-4">{children}</h1>,
                        h2: ({children}) => <h2 className="text-xl font-semibold mb-3">{children}</h2>,
                        h3: ({children}) => <h3 className="text-lg font-medium mb-2">{children}</h3>,
                        ul: ({children}) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
                        ol: ({children}) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
                        blockquote: ({children}) => <blockquote className="border-l-4 border-primary pl-4 italic mb-4">{children}</blockquote>,
                        table: ({children}) => <table className="border-collapse border border-border mb-4">{children}</table>,
                        th: ({children}) => <th className="border border-border p-2 bg-muted font-semibold">{children}</th>,
                        td: ({children}) => <td className="border border-border p-2">{children}</td>,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
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
          
          {isWaitingForResponse && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-muted-foreground" />
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-start gap-3 bg-muted/30 rounded-xl border border-border p-3">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={mode === "chat" ? "Ask anything about your finances..." : "Press and hold to speak, or type your message..."}
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground resize-none min-h-[40px] max-h-32"
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                }}
              />
              <div className="flex items-end gap-2">
                <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Globe className="w-4 h-4" />
                </Button>
                <Button 
                  type="button" 
                  variant={mode === "agent" ? "default" : "ghost"} 
                  size="sm" 
                  className="h-8 w-8 p-0"
                >
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