/**
 * Unit tests for validation utilities
 * Tests input sanitization and schema validation
 * @module __tests__/validation
 */

import { describe, it, expect } from "vitest";
import {
  sanitizeInput,
  validate,
  messageSchema,
  projectSchema,
  emailSchema,
  contactSchema,
} from "../lib/validation";

describe("sanitizeInput", () => {
  it("should remove angle brackets", () => {
    const result = sanitizeInput("Hello <script>alert('xss')</script> World");
    expect(result).toBe("Hello scriptalert('xss')/script World");
  });

  it("should trim whitespace", () => {
    const result = sanitizeInput("  hello world  ");
    expect(result).toBe("hello world");
  });

  it("should limit length to 10000 characters", () => {
    const longString = "a".repeat(15000);
    const result = sanitizeInput(longString);
    expect(result.length).toBe(10000);
  });
});

describe("messageSchema", () => {
  it("should validate valid message", () => {
    const result = validate(messageSchema, {
      content: "Hello, AI!",
      role: "user",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.content).toBe("Hello, AI!");
    }
  });

  it("should reject empty message", () => {
    const result = validate(messageSchema, {
      content: "",
      role: "user",
    });
    
    // Check discriminated union properly
    if (result.success === false) {
      expect(result.errors.length).toBeGreaterThan(0);
    } else {
      // Should not reach here
      expect(true).toBe(false);
    }
  });

  it("should reject message that is too long", () => {
    const result = validate(messageSchema, {
      content: "a".repeat(10001),
      role: "user",
    });
    expect(result.success).toBe(false);
  });

  it("should sanitize message content", () => {
    const result = validate(messageSchema, {
      content: "  Hello <script>  ",
      role: "user",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.content).not.toContain("<script>");
    }
  });
});

describe("projectSchema", () => {
  it("should validate valid project", () => {
    const result = validate(projectSchema, {
      name: "My App",
      description: "A great app",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("My App");
    }
  });

  it("should reject empty project name", () => {
    const result = validate(projectSchema, {
      name: "",
      description: "Test",
    });
    expect(result.success).toBe(false);
  });

  it("should allow optional description", () => {
    const result = validate(projectSchema, {
      name: "My App",
    });
    expect(result.success).toBe(true);
  });

  it("should reject project name that is too long", () => {
    const result = validate(projectSchema, {
      name: "a".repeat(101),
    });
    expect(result.success).toBe(false);
  });
});

describe("emailSchema", () => {
  it("should validate valid email", () => {
    const result = validate(emailSchema, {
      email: "test@example.com",
    });
    expect(result.success).toBe(true);
  });

  it("should reject invalid email", () => {
    const result = validate(emailSchema, {
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("should convert email to lowercase", () => {
    const result = validate(emailSchema, {
      email: "TEST@EXAMPLE.COM",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("test@example.com");
    }
  });
});

describe("contactSchema", () => {
  it("should validate valid contact form", () => {
    const result = validate(contactSchema, {
      name: "John Doe",
      email: "john@example.com",
      subject: "Question",
      message: "I have a question about the product.",
    });
    expect(result.success).toBe(true);
  });

  it("should reject contact form with missing fields", () => {
    const result = validate(contactSchema, {
      name: "John Doe",
      email: "john@example.com",
    });
    expect(result.success).toBe(false);
  });

  it("should reject message that is too short", () => {
    const result = validate(contactSchema, {
      name: "John Doe",
      email: "john@example.com",
      subject: "Test",
      message: "Short",
    });
    expect(result.success).toBe(false);
  });

  it("should sanitize all fields", () => {
    const result = validate(contactSchema, {
      name: "  John<script> ",
      email: " JOHN@EXAMPLE.COM ",
      subject: " Test<>Subject ",
      message: "This is a test message that is long enough.",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).not.toContain("<script>");
      expect(result.data.subject).not.toContain("<>");
      expect(result.data.email).toBe("john@example.com");
    }
  });
});
