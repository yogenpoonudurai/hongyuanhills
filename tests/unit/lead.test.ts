import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { onRequestPost } from "../../functions/api/lead";

const origin = "http://localhost:4175";
const turnstileUrl =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const resendUrl = "https://api.resend.com/emails";

const env = {
  FORM_ENABLED: "true",
  EMAIL_TRANSPORT: "resend",
  ALLOWED_ORIGINS: origin,
  TURNSTILE_SECRET_KEY: "test-turnstile-secret",
  RESEND_API_KEY: "re_test",
  FROM_EMAIL: "website@hyhills.com",
  LEAD_NOTIFICATION_EMAIL: "leads@example.com",
};

const basePayload = {
  type: "visit",
  locale: "zh",
  name: "Chan Tai Man",
  phone: "+60 12-345 6789",
  email: "test@example.com",
  interest: "columbarium",
  preferredDate: "",
  preferredTime: "any",
  message: "I would like to view Zizai Pavilion.",
  consent: true,
  website: "",
  turnstileToken: "test-token",
};

function makeRequest(
  payload: unknown,
  options: {
    origin?: string | null;
    body?: string;
    headers?: Record<string, string>;
  } = {},
) {
  const headers = new Headers({
    "content-type": "application/json",
    ...options.headers,
  });
  if (options.origin !== null) {
    headers.set("origin", options.origin ?? origin);
  }
  return new Request("https://example.com/api/lead", {
    method: "POST",
    headers,
    body: options.body ?? JSON.stringify(payload),
  });
}

function installFetch(
  options: { turnstileSuccess?: boolean; resendStatus?: number } = {},
) {
  const { turnstileSuccess = true, resendStatus = 200 } = options;
  const mock = vi.fn(
    async (input: RequestInfo | URL, _init?: RequestInit) => {
      const url =
        typeof input === "string"
          ? input
          : input instanceof URL
            ? input.href
            : input.url;

      if (url === turnstileUrl) {
        return new Response(JSON.stringify({ success: turnstileSuccess }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      }
      if (url === resendUrl) {
        return new Response(JSON.stringify({ id: "test-email" }), {
          status: resendStatus,
          headers: { "content-type": "application/json" },
        });
      }
      throw new Error(`Unexpected fetch: ${url}`);
    },
  );

  vi.stubGlobal("fetch", mock);
  return mock;
}

function resendBody(mock: ReturnType<typeof installFetch>) {
  const call = mock.mock.calls.find(([input]) =>
    input.toString().includes("api.resend.com"),
  );
  return JSON.parse(String((call?.[1] as RequestInit | undefined)?.body));
}

beforeEach(() => {
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("POST /api/lead", () => {
  it("sends a valid lead through Turnstile and Resend", async () => {
    const fetchMock = installFetch();
    const response = await onRequestPost({
      request: makeRequest(basePayload),
      env,
    });

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(2);

    const email = resendBody(fetchMock);
    expect(email.subject).toContain("Chan Tai Man");
    expect(email.reply_to).toBe("test@example.com");
    expect(email.text).toContain("I would like to view Zizai Pavilion.");
  });

  it("rejects a lead without consent", async () => {
    const fetchMock = installFetch();
    const response = await onRequestPost({
      request: makeRequest({ ...basePayload, consent: false }),
      env,
    });

    expect(response.status).toBe(400);
    const body = (await response.json()) as {
      error: string;
      fields: Record<string, string>;
    };
    expect(body.error).toBe("validation");
    expect(body.fields.consent).toBeDefined();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("silently accepts a honeypot submission", async () => {
    const fetchMock = installFetch();
    const response = await onRequestPost({
      request: makeRequest({ ...basePayload, website: "spam" }),
      env,
    });

    expect(response.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects a mismatched origin", async () => {
    const fetchMock = installFetch();
    const response = await onRequestPost({
      request: makeRequest(basePayload, { origin: "https://evil.example" }),
      env,
    });

    expect(response.status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects a failed Turnstile verification", async () => {
    const fetchMock = installFetch({ turnstileSuccess: false });
    const response = await onRequestPost({
      request: makeRequest(basePayload),
      env,
    });

    expect(response.status).toBe(403);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("returns a WhatsApp fallback when Resend fails", async () => {
    const fetchMock = installFetch({ resendStatus: 500 });
    const response = await onRequestPost({
      request: makeRequest(basePayload),
      env,
    });

    expect(response.status).toBe(502);
    const body = (await response.json()) as {
      error: string;
      fallback: string;
    };
    expect(body.error).toBe("delivery_failed");
    expect(body.fallback).toBe("whatsapp");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("does not call Resend in noop transport mode", async () => {
    const fetchMock = installFetch();
    const response = await onRequestPost({
      request: makeRequest(basePayload),
      env: { ...env, EMAIL_TRANSPORT: "noop" },
    });

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("rejects submissions when the form is disabled", async () => {
    const fetchMock = installFetch();
    const response = await onRequestPost({
      request: makeRequest(basePayload),
      env: { ...env, FORM_ENABLED: "false" },
    });

    expect(response.status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects oversized bodies", async () => {
    const fetchMock = installFetch();
    const response = await onRequestPost({
      request: makeRequest(basePayload, {
        body: JSON.stringify({ ...basePayload, message: "x".repeat(9000) }),
      }),
      env,
    });

    expect(response.status).toBe(413);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects an invalid email address", async () => {
    const fetchMock = installFetch();
    const response = await onRequestPost({
      request: makeRequest({ ...basePayload, email: "not-an-email" }),
      env,
    });

    expect(response.status).toBe(400);
    const body = (await response.json()) as {
      fields: Record<string, string>;
    };
    expect(body.fields.email).toBeDefined();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects a missing Turnstile token", async () => {
    const fetchMock = installFetch();
    const response = await onRequestPost({
      request: makeRequest({ ...basePayload, turnstileToken: "" }),
      env,
    });

    expect(response.status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
