import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { profile } from "@/data/profile";
import { sendContactMessage, type ContactFormState } from "@/lib/contact";

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
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY", "test-key");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("reports each invalid field and keeps what was typed", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
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
    expect(fetchMock).not.toHaveBeenCalled();
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

  it("points to email when no access key is configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY", "");
    const result = await sendContactMessage(idle, form(valid));
    expect(result.status).toBe("error");
    expect(result.message).toContain(profile.email);
  });

  it("sends through Web3Forms with a single-line subject", async () => {
    const fetchMock = vi.fn(async () => Response.json({ success: true }));
    vi.stubGlobal("fetch", fetchMock);

    const result = await sendContactMessage(
      idle,
      form({ ...valid, name: "Ada\nBcc: someone" }),
    );

    expect(result.status).toBe("success");
    const [url, init] = fetchMock.mock.calls[0] as unknown as [
      string,
      RequestInit,
    ];
    expect(url).toBe("https://api.web3forms.com/submit");
    const body = JSON.parse(String(init.body));
    expect(body.access_key).toBe("test-key");
    expect(body.subject).toBe("Portfolio message from Ada Bcc: someone");
    expect(body.email).toBe(valid.email);
    expect(body.message).toBe(valid.message);
  });

  it("reports a rejection from Web3Forms and keeps the message", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        Response.json({ success: false, message: "Invalid access key" }, {
          status: 400,
        }),
      ),
    );
    const result = await sendContactMessage(idle, form(valid));
    expect(result.status).toBe("error");
    expect(result.message).toContain(profile.email);
    expect(result.values?.message).toBe(valid.message);
  });

  it("handles a network failure", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new TypeError("Failed to fetch");
      }),
    );
    const result = await sendContactMessage(idle, form(valid));
    expect(result.status).toBe("error");
  });
});
