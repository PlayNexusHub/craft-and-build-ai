/**
 * Core type definitions for PlayNexus AI Creator
 * @module types
 */

/**
 * Message role in a conversation
 */
export type MessageRole = "user" | "assistant" | "system";

/**
 * Message status for tracking generation state
 */
export type MessageStatus = "sending" | "sent" | "error" | "generating";

/**
 * Chat message structure
 */
export interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
  status?: MessageStatus;
  error?: string;
}

/**
 * Project status lifecycle
 */
export type ProjectStatus = "draft" | "generating" | "ready" | "error" | "archived";

/**
 * Project structure
 */
export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
  lastGenerated?: Date;
  metadata?: ProjectMetadata;
}

/**
 * Project metadata for additional context
 */
export interface ProjectMetadata {
  framework?: string;
  language?: string;
  features?: string[];
  tags?: string[];
}

/**
 * File type enumeration
 */
export type FileType = "react" | "typescript" | "javascript" | "css" | "json" | "image" | "other";

/**
 * Project file structure
 */
export interface ProjectFile {
  id: string;
  projectId: string;
  name: string;
  path: string;
  type: FileType;
  content?: string;
  size: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * AI Mode configuration
 */
export type AIMode = "local" | "cloud";

/**
 * Template structure
 */
export interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  tags: string[];
}

/**
 * User preferences
 */
export interface UserPreferences {
  aiMode: AIMode;
  theme: "light" | "dark" | "system";
  autoSave: boolean;
  showWelcome: boolean;
}

/**
 * Error response structure
 */
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
  timestamp: Date;
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
  data?: T;
  error?: AppError;
  success: boolean;
}
