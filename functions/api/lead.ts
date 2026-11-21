import { fieldErrors, leadSchema } from "../../lib/lead-schema";

type Env = {
  FORM_ENABLED?: string;
  EMAIL_TRANSPORT?: string;
  ALLOWED_ORIGINS?: string;
  TURNSTILE_SECRET_KEY?: string;
  RESEND_API_KEY?: string;
  FROM_EMAIL?: string;
  LEAD_NOTIFICATION_EMAIL?: string;
};

const MAX_BODY_BYTES = 8 * 1024;

const typeLabels: Record<string, string> = {
  visit: "Book a visit",
  enquiry: "General enquiry",
  funeral: "Urgent funeral assistance",
  notify: "Notify me",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function allowedOrigins(env: Env): string[] {
  const configured = env.ALLOWED_ORIGINS?.trim();
  const defaults = "https://hongyuanhills.com,https://www.hongyuanhills.com";
  return (configured || defaults)
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export async function onRequestPost({
  request,
  env,
}: {
  request: Request;
  env: Env;
}): Promise<Response> {
  if (env.FORM_ENABLED === "false") {
    return json(
      { ok: false, error: "form_disabled", fallback: "whatsapp" },
      503,
    );
  }

  const origin = request.headers.get("Origin");
  if (!origin || !allowedOrigins(env).includes(origin)) {
    return json({ ok: false, error: "origin" }, 403);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return json({ ok: false, error: "too_large" }, 413);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, error: "too_large" }, 413);
  }

  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "validation", fields: {} }, 400);
  }

  if (
    typeof data === "object" &&
    data !== null &&
    "website" in data &&
    typeof (data as { website?: unknown }).website === "string" &&
    (data as { website: string }).website.trim().length > 0
  ) {
    return json({ ok: true }, 200);
  }

  const parsed = leadSchema.safeParse(data);
  if (!parsed.success) {
    return json(
      {
        ok: false,
        error: "validation",
        fields: fieldErrors(parsed.error.issues),
      },
      400,
    );
  }

  const lead = parsed.data;

  if (!env.TURNSTILE_SECRET_KEY) {
    console.error("lead: missing TURNSTILE_SECRET_KEY");
    return json(
      { ok: false, error: "form_disabled", fallback: "whatsapp" },
      503,
    );
  }

  if (!lead.turnstileToken) {
    return json({ ok: false, error: "turnstile" }, 403);
  }

  const turnstileBody = new URLSearchParams({
    secret: env.TURNSTILE_SECRET_KEY,
    response: lead.turnstileToken,
  });
  const remoteIp = request.headers.get("CF-Connecting-IP");
  if (remoteIp) turnstileBody.set("remoteip", remoteIp);

  const turnstileResponse = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body: turnstileBody },
  );

  if (!turnstileResponse.ok) {
    console.error("lead: turnstile request failed", turnstileResponse.status);
    return json({ ok: false, error: "turnstile" }, 403);
  }

  const turnstileResult = (await turnstileResponse.json()) as {
    success?: boolean;
  };
  if (!turnstileResult.success) {
    return json({ ok: false, error: "turnstile" }, 403);
  }

  if (env.EMAIL_TRANSPORT === "noop") {
    console.log(
      JSON.stringify({
        event: "lead_submitted",
        transport: "noop",
        type: lead.type,
        locale: lead.locale,
      }),
    );
    return json({ ok: true }, 200);
  }

  if (
    !env.RESEND_API_KEY ||
    !env.FROM_EMAIL ||
    !env.LEAD_NOTIFICATION_EMAIL
  ) {
    console.error("lead: missing email transport configuration");
    return json(
      { ok: false, error: "form_disabled", fallback: "whatsapp" },
      503,
    );
  }

  const typeLabel = typeLabels[lead.type] ?? lead.type;
  const subject = `[Hong Yuan Hills] ${typeLabel} — ${lead.name}`;
  const lines = [
    `Type: ${typeLabel}`,
    `Language: ${lead.locale === "zh" ? "Chinese" : "English"}`,
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    lead.email ? `Email: ${lead.email}` : "",
    lead.interest ? `Interest: ${lead.interest}` : "",
    lead.preferredDate ? `Preferred date: ${lead.preferredDate}` : "",
    lead.preferredTime ? `Preferred time: ${lead.preferredTime}` : "",
    lead.message ? `Message: ${lead.message}` : "",
    lead.page ? `Page: ${lead.page}` : "",
    lead.utm
      ? `UTM: ${Object.entries(lead.utm)
          .filter(([, value]) => Boolean(value))
          .map(([key, value]) => `${key}=${value}`)
          .join(", ")}`
      : "",
    `Consent: yes (${new Date().toISOString()})`,
  ].filter(Boolean);

  const htmlRows = [
    ["Type", typeLabel],
    ["Language", lead.locale === "zh" ? "Chinese" : "English"],
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email],
    ["Interest", lead.interest],
    ["Preferred date", lead.preferredDate],
    ["Preferred time", lead.preferredTime],
    ["Message", lead.message],
    ["Page", lead.page],
    [
      "UTM",
      lead.utm
        ? Object.entries(lead.utm)
            .filter(([, value]) => Boolean(value))
            .map(([key, value]) => `${key}=${value}`)
            .join(", ")
        : undefined,
    ],
    ["Consent", `yes (${new Date().toISOString()})`],
  ]
    .filter(([, value]) => Boolean(value))
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:4px 12px 4px 0">${escapeHtml(
          String(label),
        )}</th><td style="padding:4px 0">${escapeHtml(
          String(value),
        ).replaceAll("\n", "<br />")}</td></tr>`,
    )
    .join("");

  const payload = {
    from: env.FROM_EMAIL,
    to: [env.LEAD_NOTIFICATION_EMAIL],
    subject,
    text: lines.join("\n"),
    html: `<h2>${escapeHtml(subject)}</h2><table>${htmlRows}</table>`,
    ...(lead.email ? { reply_to: lead.email } : {}),
  };

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!resendResponse.ok) {
    console.error("lead: resend failed", resendResponse.status);
    return json(
      { ok: false, error: "delivery_failed", fallback: "whatsapp" },
      502,
    );
  }

  console.log(
    JSON.stringify({
      event: "lead_submitted",
      transport: "resend",
      type: lead.type,
      locale: lead.locale,
    }),
  );

  return json({ ok: true }, 200);
}
