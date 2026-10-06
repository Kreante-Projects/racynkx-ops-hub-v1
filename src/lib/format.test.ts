import { describe, it, expect } from "vitest";
import { formatDateTime } from "./format";

describe("formatDateTime", () => {
  it("returns a dash for empty values", () => {
    expect(formatDateTime(null)).toBe("—");
    expect(formatDateTime(undefined)).toBe("—");
  });

  it("includes both date and time in fr-FR", () => {
    const value = "2026-10-06T14:35:00";
    const expected = new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));

    expect(formatDateTime(value)).toBe(expected);
    expect(formatDateTime(value)).toContain("14:35");
  });
});
