import { describe, it, expect, vi, beforeEach } from "vitest";

const calls: { method: string; args: unknown[] }[] = [];

vi.mock("@/lib/supabase", () => {
  const builder: Record<string, unknown> = {};
  for (const method of ["select", "range", "order", "or", "eq"]) {
    builder[method] = (...args: unknown[]) => {
      calls.push({ method, args });
      return builder;
    };
  }
  builder.then = (resolve: (value: unknown) => void) =>
    resolve({ data: [], error: null, count: 0 });
  return { supabase: { from: () => builder } };
});

import { getProfiles } from "./profile.service";

describe("getProfiles", () => {
  beforeEach(() => {
    calls.length = 0;
  });

  it("orders profiles by created_at descending with a stable tiebreaker", async () => {
    await getProfiles({ perPage: 10 });

    const orders = calls.filter((c) => c.method === "order").map((c) => c.args);
    expect(orders).toEqual([
      ["created_at", { ascending: false, nullsFirst: false }],
      ["user_id", { ascending: true }],
    ]);
  });
});
