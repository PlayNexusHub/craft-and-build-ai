/**
 * Input validation utilities using Zod
 * Provides type-safe validation for all user inputs
 * @module validation
 */

import { z } from "zod";

/**
 * Sanitizes user input by removing potentially dangerous content
 * @param input - Raw user input
 * @returns Sanitized string
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove angle brackets to prevent XSS
    .slice(0, 10000); // Limit input length
};

/**
 * Schema for chat message validation
 */
export const messageSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, { message: "Message cannot be empty" })
    .max(10000, { message: "Message is too long (max 10,000 characters)" })
    .transform(sanitizeInput),
  role: z.enum(["user", "assistant", "system"]),
});

/**
 * Schema for project creation/update
 */
export const projectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Project name is required" })
    .max(100, { message: "Project name must be less than 100 characters" })
    .transform(sanitizeInput),
  description: z
    .string()
    .trim()
    .max(500, { message: "Description must be less than 500 characters" })
    .transform(sanitizeInput)
    .optional(),
});

/**
 * Schema for email validation
 */
export const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" })
    .toLowerCase(),
});

/**
 * Schema for contact form
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" })
    .transform(sanitizeInput),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" })
    .toLowerCase(),
  subject: z
    .string()
    .trim()
    .min(1, { message: "Subject is required" })
    .max(200, { message: "Subject must be less than 200 characters" })
    .transform(sanitizeInput),
  message: z
    .string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(2000, { message: "Message must be less than 2,000 characters" })
    .transform(sanitizeInput),
});

/**
 * Type exports for validated data
 */
export type ValidatedMessage = z.infer<typeof messageSchema>;
export type ValidatedProject = z.infer<typeof projectSchema>;
export type ValidatedContact = z.infer<typeof contactSchema>;

/**
 * Generic validation function with error handling
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Validation result with success flag and data/errors
 */
export const validate = <T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): { success: true; data: z.infer<T> } | { success: false; errors: string[] } => {
  try {
    const result = schema.safeParse(data);
    if (result.success) {
      return { success: true, data: result.data };
    }
    return {
      success: false,
      errors: result.error.errors.map((e) => e.message),
    };
  } catch (error) {
    return {
      success: false,
      errors: ["Validation failed unexpectedly"],
    };
  }
};
