/**
 * Unit tests for formatter utilities
 * Tests date, time, and size formatting
 * @module __tests__/formatters
 */

import { describe, it, expect } from "vitest";
import {
  formatRelativeTime,
  formatFileSize,
  formatTime,
  formatDate,
  truncateString,
  capitalize,
  toTitleCase,
} from "../lib/formatters";

describe("formatRelativeTime", () => {
  it("should format seconds as 'just now'", () => {
    const date = new Date(Date.now() - 30 * 1000); // 30 seconds ago
    expect(formatRelativeTime(date)).toBe("just now");
  });

  it("should format minutes correctly", () => {
    const date = new Date(Date.now() - 5 * 60 * 1000); // 5 minutes ago
    expect(formatRelativeTime(date)).toBe("5 minutes ago");
  });

  it("should format hours correctly", () => {
    const date = new Date(Date.now() - 3 * 60 * 60 * 1000); // 3 hours ago
    expect(formatRelativeTime(date)).toBe("3 hours ago");
  });

  it("should format days correctly", () => {
    const date = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
    expect(formatRelativeTime(date)).toBe("2 days ago");
  });
});

describe("formatFileSize", () => {
  it("should format 0 bytes", () => {
    expect(formatFileSize(0)).toBe("0 Bytes");
  });

  it("should format bytes", () => {
    expect(formatFileSize(512)).toBe("512 Bytes");
  });

  it("should format kilobytes", () => {
    expect(formatFileSize(1024)).toBe("1 KB");
  });

  it("should format megabytes", () => {
    expect(formatFileSize(1024 * 1024)).toBe("1 MB");
  });

  it("should format gigabytes", () => {
    expect(formatFileSize(1024 * 1024 * 1024)).toBe("1 GB");
  });

  it("should format decimal sizes correctly", () => {
    expect(formatFileSize(1536)).toBe("1.5 KB");
  });
});

describe("formatTime", () => {
  it("should format time in 12-hour format", () => {
    const date = new Date("2024-01-15T14:30:00");
    const result = formatTime(date);
    expect(result).toMatch(/2:30 PM/i);
  });
});

describe("formatDate", () => {
  it("should format date with month abbreviation", () => {
    const date = new Date("2024-01-15");
    const result = formatDate(date);
    expect(result).toMatch(/Jan/);
    expect(result).toMatch(/15/);
    expect(result).toMatch(/2024/);
  });
});

describe("truncateString", () => {
  it("should not truncate short strings", () => {
    const result = truncateString("Hello", 10);
    expect(result).toBe("Hello");
  });

  it("should truncate long strings with ellipsis", () => {
    const result = truncateString("Hello World Test", 10);
    expect(result).toBe("Hello W...");
    expect(result.length).toBe(10);
  });
});

describe("capitalize", () => {
  it("should capitalize first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  it("should lowercase the rest", () => {
    expect(capitalize("hELLO")).toBe("Hello");
  });

  it("should handle empty string", () => {
    expect(capitalize("")).toBe("");
  });
});

describe("toTitleCase", () => {
  it("should convert to title case", () => {
    expect(toTitleCase("hello world")).toBe("Hello World");
  });

  it("should handle multiple words", () => {
    expect(toTitleCase("the quick brown fox")).toBe("The Quick Brown Fox");
  });

  it("should handle all caps", () => {
    expect(toTitleCase("HELLO WORLD")).toBe("Hello World");
  });
});
