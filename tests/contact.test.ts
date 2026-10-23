import { afterEach, describe, expect, it, vi } from "vitest";

import { profile } from "@/data/profile";
import {
  sendContactMessage,
  type ContactFormState,
} from "@/lib/actions/contact";

const idle: ContactFormState = { status: "idle" };

function form(fields: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "Hello! I enjoyed reading about your research.",
};

describe("sendContactMessage", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("reports each invalid field and keeps what was typed", async () => {
    const result = await sendContactMessage(
      idle,
      form({ name: "A", email: "nope", message: "short" }),
    );
    expect(result.status).toBe("error");
    expect(Object.keys(result.errors ?? {}).sort()).toEqual([
      "email",
      "message",
      "name",
    ]);
    expect(result.values?.email).toBe("nope");
  });

  it("silently accepts honeypot submissions without sending", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const result = await sendContactMessage(
      idle,
      form({ ...valid, website: "spam.example" }),
    );
    expect(result.status).toBe("success");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("points to email when no API key is configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const result = await sendContactMessage(idle, form(valid));
    expect(result.status).toBe("error");
    expect(result.message).toContain(profile.email);
  });

  it("sends through Resend with a single-line subject", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-key");
    const fetchMock = vi.fn(async () => Response.json({ id: "1" }));
    vi.stubGlobal("fetch", fetchMock);

    const result = await sendContactMessage(
      idle,
      form({ ...valid, name: "Ada\nBcc: someone" }),
    );

    expect(result.status).toBe("success");
    const [, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    const body = JSON.parse(String(init.body));
    expect(body.subject).toBe("Portfolio message from Ada Bcc: someone");
    expect(body.reply_to).toBe(valid.email);
  });

  it("reports a failure from Resend", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("bad", { status: 500 })),
    );
    const result = await sendContactMessage(idle, form(valid));
    expect(result.status).toBe("error");
    expect(result.values?.message).toBe(valid.message);
  });
});
