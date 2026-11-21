"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: Record<string, unknown>,
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId?: string) => void;
    };
  }
}

const SCRIPT_ID = "cf-turnstile-script";

type TurnstileWidgetProps = {
  siteKey?: string;
  onToken: (token: string) => void;
};

export function TurnstileWidget({ siteKey, onToken }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<string | null>(null);
  const [ready, setReady] = useState(
    () => typeof window !== "undefined" && Boolean(window.turnstile),
  );

  useEffect(() => {
    if (!siteKey) return;
    if (window.turnstile) {
      if (!ready) queueMicrotask(() => setReady(true));
      return;
    }

    const existing = document.getElementById(SCRIPT_ID) as
      | HTMLScriptElement
      | null;
    const handleLoad = () => setReady(true);

    if (existing) {
      existing.addEventListener("load", handleLoad);
      return () => existing.removeEventListener("load", handleLoad);
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.addEventListener("load", handleLoad);
    document.head.appendChild(script);

    return () => script.removeEventListener("load", handleLoad);
  }, [siteKey, ready]);

  useEffect(() => {
    if (!siteKey || !ready || !containerRef.current || !window.turnstile) {
      return;
    }

    const widgetId = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme: "light",
      size: "flexible",
      callback: (token: string) => onToken(token),
      "expired-callback": () => onToken(""),
      "error-callback": () => onToken(""),
    });
    widgetRef.current = widgetId;

    return () => {
      if (widgetRef.current && window.turnstile) {
        window.turnstile.remove(widgetRef.current);
        widgetRef.current = null;
      }
    };
  }, [ready, siteKey, onToken]);

  if (!siteKey) return null;

  return (
    <div
      ref={containerRef}
      className="mt-1 min-h-[65px]"
      aria-label="Turnstile verification"
    />
  );
}
