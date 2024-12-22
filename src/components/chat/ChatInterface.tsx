import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Plus, Settings, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Starter {
  id: string;
  text: string;
}

export const ChatInterface = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm Algo, your CRM AI Assistant. How can i assist you?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingStarters, setIsEditingStarters] = useState(false);
  const [newStarter, setNewStarter] = useState("");
  const [starters, setStarters] = useState<Starter[]>([
    { id: "1", text: "Show me sales performance" },
    { id: "2", text: "Generate a customer report" },
    { id: "3", text: "Analyze recent trends" },
    { id: "4", text: "Schedule a follow-up" },
  ]);

  const handleSend = async (content: string = input) => {
    if (!content.trim()) return;

    const userMessage = { role: "user" as const, content: content.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        role: "assistant" as const,
        content: "I understand you're asking about " + content + ". I'm currently in demo mode, but in a full implementation, I would provide relevant CRM information and assistance.",
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

  const addStarter = () => {
    if (!newStarter.trim()) return;
    const newId = (starters.length + 1).toString();
    setStarters([...starters, { id: newId, text: newStarter.trim() }]);
    setNewStarter("");
    toast({
      title: "Conversation starter added",
      description: "Your new conversation starter has been added successfully.",
    });
  };

  const deleteStarter = (id: string) => {
    setStarters(starters.filter(starter => starter.id !== id));
    toast({
      title: "Conversation starter deleted",
      description: "The conversation starter has been removed.",
    });
  };

  const editStarter = (id: string, newText: string) => {
    setStarters(starters.map(starter => 
      starter.id === id ? { ...starter, text: newText } : starter
    ));
    toast({
      title: "Conversation starter updated",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <Card className="bg-black/50 backdrop-blur-xl border-gray-800 hover:border-blue-500/50 transition-all duration-300">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">ALGO</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditingStarters(!isEditingStarters)}
            className="text-gray-400 hover:text-white"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        <div className="h-[400px] flex flex-col">
          <ScrollArea className="flex-1 pr-4">
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

          {!isEditingStarters && (
            <div className="mt-4 mb-4 flex flex-wrap gap-2">
              {starters.map((starter) => (
                <Button
                  key={starter.id}
                  variant="secondary"
                  size="sm"
                  className="text-sm"
                  onClick={() => handleSend(starter.text)}
                >
                  {starter.text}
                </Button>
              ))}
            </div>
          )}

          {isEditingStarters && (
            <div className="mt-4 mb-4 space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Add new starter..."
                  value={newStarter}
                  onChange={(e) => setNewStarter(e.target.value)}
                  className="bg-gray-900 border-gray-800 text-white"
                />
                <Button onClick={addStarter} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {starters.map((starter) => (
                  <div key={starter.id} className="flex items-center gap-2">
                    <Input
                      value={starter.text}
                      onChange={(e) => editStarter(starter.id, e.target.value)}
                      className="bg-gray-900 border-gray-800 text-white"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => deleteStarter(starter.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 border-t border-gray-800 pt-4">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-gray-900 border-gray-800 text-white"
              />
              <Button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};