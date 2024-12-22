import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { ChatInterface } from "./ChatInterface";
import { cn } from "@/lib/utils";

export const FloatingChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="relative w-[400px] animate-in fade-in slide-in-from-bottom-5">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 z-50"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          <ChatInterface />
        </div>
      ) : (
        <Button
          size="lg"
          className={cn(
            "rounded-full h-14 w-14 animate-bounce shadow-lg",
            "bg-blue-600 hover:bg-blue-700"
          )}
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};