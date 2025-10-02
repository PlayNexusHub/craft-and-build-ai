/**
 * Chat management hook with error handling and validation
 * Encapsulates all chat logic with proper error boundaries
 * @module hooks/useChat
 */

import { useState, useCallback } from "react";
import { Message, MessageStatus } from "@/types";
import { validate, messageSchema } from "@/lib/validation";
import { toast } from "@/hooks/use-toast";

interface UseChatOptions {
  onError?: (error: Error) => void;
  onSuccess?: (message: Message) => void;
}

interface UseChatReturn {
  messages: Message[];
  isGenerating: boolean;
  error: Error | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  retryLastMessage: () => Promise<void>;
}

/**
 * Hook for managing chat state and operations
 * @param options - Configuration options
 * @returns Chat state and operations
 */
export const useChat = (options: UseChatOptions = {}): UseChatReturn => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hello! I'm your PlayNexus AI assistant. I can help you create production-ready applications, games, and tools from natural language descriptions. What would you like to build today?",
      role: "assistant",
      timestamp: new Date(),
      status: "sent",
    },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastUserMessage, setLastUserMessage] = useState<string>("");

  /**
   * Generates AI response (currently mocked, ready for API integration)
   * @param userMessage - User's message content
   * @returns AI response message
   */
  const generateAIResponse = useCallback(
    async (userMessage: string): Promise<Message> => {
      // TODO: Replace with actual AI API call to Supabase Edge Function
      // Example:
      // const { data, error } = await supabase.functions.invoke('generate-response', {
      //   body: { message: userMessage }
      // });

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: `ai-${Date.now()}`,
            content: `I'll help you create that! Let me analyze your request and generate the code structure. This is a demo response - in the full version, I would connect to local or cloud AI models to generate your app.`,
            role: "assistant",
            timestamp: new Date(),
            status: "sent",
          });
        }, 2000);
      });
    },
    []
  );

  /**
   * Sends a message with validation and error handling
   * @param content - Message content to send
   */
  const sendMessage = useCallback(
    async (content: string): Promise<void> => {
      setError(null);

      // Validate input
      const validation = validate(messageSchema, { content, role: "user" });
      
      // TypeScript discriminated union - must check success explicitly
      if (validation.success === false) {
        const errorMsg = validation.errors.join(", ");
        toast({
          variant: "destructive",
          title: "Invalid Message",
          description: errorMsg,
        });
        setError(new Error(errorMsg));
        return;
      }

      // Now TypeScript knows validation.data exists
      const sanitizedContent = validation.data.content || "";
      setLastUserMessage(sanitizedContent);

      const userMessage: Message = {
        id: `user-${Date.now()}`,
        content: sanitizedContent,
        role: "user",
        timestamp: new Date(),
        status: "sent",
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsGenerating(true);

      try {
        const aiResponse = await generateAIResponse(sanitizedContent);
        setMessages((prev) => [...prev, aiResponse]);
        options.onSuccess?.(aiResponse);
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Failed to generate response");
        setError(error);
        setMessages((prev) => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            content:
              "I apologize, but I encountered an error generating a response. Please try again.",
            role: "assistant",
            timestamp: new Date(),
            status: "error",
            error: error.message,
          },
        ]);
        toast({
          variant: "destructive",
          title: "Generation Error",
          description: error.message,
        });
        options.onError?.(error);
      } finally {
        setIsGenerating(false);
      }
    },
    [generateAIResponse, options]
  );

  /**
   * Retries the last failed message
   */
  const retryLastMessage = useCallback(async (): Promise<void> => {
    if (lastUserMessage) {
      await sendMessage(lastUserMessage);
    }
  }, [lastUserMessage, sendMessage]);

  /**
   * Clears all messages except welcome message
   */
  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: "welcome",
        content:
          "Hello! I'm your PlayNexus AI assistant. What would you like to build today?",
        role: "assistant",
        timestamp: new Date(),
        status: "sent",
      },
    ]);
    setError(null);
  }, []);

  return {
    messages,
    isGenerating,
    error,
    sendMessage,
    clearMessages,
    retryLastMessage,
  };
};
