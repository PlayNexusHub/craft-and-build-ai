/**
 * Individual chat message component
 * Extracted for better testability and reusability
 * @module components/ChatMessage
 */

import { memo } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Code2, AlertCircle } from "lucide-react";
import { Message } from "@/types";
import { formatTime } from "@/lib/formatters";

interface ChatMessageProps {
  message: Message;
  "aria-label"?: string;
}

/**
 * Displays a single chat message with proper styling and accessibility
 * Memoized to prevent unnecessary re-renders
 */
export const ChatMessage = memo<ChatMessageProps>(({ message, "aria-label": ariaLabel }) => {
  const isUser = message.role === "user";
  const hasError = message.status === "error";

  return (
    <div
      className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
      role="article"
      aria-label={ariaLabel || `${isUser ? "User" : "Assistant"} message`}
    >
      {!isUser && (
        <Avatar className="w-8 h-8 bg-gradient-accent shrink-0" aria-hidden="true">
          <AvatarFallback className="bg-transparent text-accent-foreground">
            <Code2 className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          isUser
            ? "bg-primary text-primary-foreground"
            : hasError
            ? "bg-destructive/10 border border-destructive"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {hasError && (
          <div className="flex items-center gap-2 mb-2 text-destructive" role="alert">
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
            <span className="text-xs font-medium">Error</span>
          </div>
        )}
        
        <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
        
        <p className="text-xs mt-1 opacity-70" aria-label={`Sent at ${formatTime(message.timestamp)}`}>
          {formatTime(message.timestamp)}
        </p>
      </div>

      {isUser && (
        <Avatar className="w-8 h-8 shrink-0" aria-hidden="true">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
});

ChatMessage.displayName = "ChatMessage";
