/**
 * AI Chat Component - Refactored for production
 * Features:
 * - Type-safe message handling
 * - Input validation and sanitization
 * - Error handling with user feedback
 * - Accessibility improvements (ARIA labels, keyboard nav)
 * - Proper loading states
 * @module components/AIChat
 */

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/components/ChatMessage";
import { useChat } from "@/hooks/useChat";

/**
 * Main chat interface component
 * Handles user interaction with AI assistant
 */
export const AIChat = () => {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { messages, isGenerating, error, sendMessage, clearMessages, retryLastMessage } = useChat({
    onError: (err) => {
      console.error("Chat error:", err);
    },
    onSuccess: () => {
      setInput("");
      inputRef.current?.focus();
    },
  });

  /**
   * Auto-scroll to bottom when new messages arrive
   */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  /**
   * Handles message submission with validation
   */
  const handleSendMessage = async () => {
    if (!input.trim() || isGenerating) return;
    await sendMessage(input);
  };

  /**
   * Handles keyboard shortcuts
   * Enter: Send message
   * Ctrl/Cmd + K: Clear messages
   */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
    
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      clearMessages();
    }
  };

  return (
    <div className="flex flex-col h-full bg-card border-r border-border" role="region" aria-label="AI Chat">
      {/* Header */}
      <header className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-primary rounded-lg" aria-hidden="true">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-card-foreground">PlayNexus AI Assistant</h2>
              <p className="text-sm text-muted-foreground">Privacy-first code generation</p>
            </div>
          </div>
          
          {error && (
            <Button
              variant="ghost"
              size="sm"
              onClick={retryLastMessage}
              className="text-destructive hover:text-destructive"
              aria-label="Retry last message"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Retry
            </Button>
          )}
        </div>
      </header>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef} role="log" aria-live="polite" aria-atomic="false">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isGenerating && (
            <div className="flex gap-3 justify-start" role="status" aria-label="AI is generating a response">
              <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center" aria-hidden="true">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-accent-foreground border-t-transparent"></div>
              </div>
              <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                <p className="text-sm text-muted-foreground">Generating response...</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <footer className="p-4 border-t border-border">
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Describe the app you want to create... (Ctrl+K to clear)"
            className="flex-1"
            disabled={isGenerating}
            aria-label="Message input"
            aria-describedby="input-help"
            maxLength={10000}
          />
          <span id="input-help" className="sr-only">
            Type your message and press Enter to send, or use Ctrl+K to clear the conversation
          </span>
          <Button
            type="submit"
            disabled={!input.trim() || isGenerating}
            className="bg-gradient-primary hover:shadow-glow transition-smooth"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" aria-hidden="true" />
          </Button>
        </form>
      </footer>
    </div>
  );
};