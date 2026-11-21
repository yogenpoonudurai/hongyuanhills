import type { Metadata, Viewport } from "next";
import "../globals.css";
import { SiteShell } from "@/components/layout/SiteShell";
import { homeCopy } from "@/content/home";
import { fontClassNames } from "@/lib/fonts";
import { SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: homeCopy.en.meta.title,
    template: "%s | Hong Yuan Hills",
  },
  description: homeCopy.en.meta.description,
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#123328",
};

export default function EnglishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontClassNames}>
      <body className="min-h-dvh bg-paper text-ink antialiased">
        <SiteShell locale="en">{children}</SiteShell>
      </body>
    </html>
  );
}
