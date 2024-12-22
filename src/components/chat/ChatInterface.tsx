import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const ChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI assistant. How can I help you with the CRM today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response - In a real implementation, this would call your AI service
    setTimeout(() => {
      const aiResponse = {
        role: "assistant" as const,
        content: "I understand you're asking about " + input + ". I'm currently in demo mode, but in a full implementation, I would provide relevant CRM information and assistance.",
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      ) : (
        <Card className="w-[380px] h-[500px] flex flex-col bg-black/50 backdrop-blur-xl border-gray-800">
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h3 className="font-semibold text-white">AI Assistant</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex w-max max-w-[80%] rounded-lg px-4 py-2",
                    message.role === "user"
                      ? "ml-auto bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-100"
                  )}
                >
                  {message.content}
                </div>
              ))}
              {isLoading && (
                <div className="bg-gray-800 text-gray-100 w-max max-w-[80%] rounded-lg px-4 py-2">
                  Thinking...
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-gray-800">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-gray-900 border-gray-800 text-white"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};