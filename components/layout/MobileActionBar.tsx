import { PhoneIcon, WhatsAppIcon, CalendarIcon } from "@/components/ui/Icons";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/content/types";
import { contact, telHref, waLink } from "@/lib/contact";

export function MobileActionBar({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];
  const home = locale === "zh" ? "/" : "/en";

  return (
    <nav
      aria-label={locale === "zh" ? "快捷联系" : "Quick contact"}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-3">
        <a
          href={telHref(contact.phone24h)}
          aria-label={`${copy.cta.callShort} · ${copy.cta.call}`}
          className="flex h-14 flex-col items-center justify-center gap-1 text-[10px] font-semibold tracking-wide text-jade"
        >
          <PhoneIcon className="h-4 w-4" />
          {copy.cta.callShort}
        </a>
        <a
          href={waLink(copy.whatsapp.general)}
          target="_blank"
          rel="noreferrer"
          aria-label={copy.cta.whatsapp}
          className="flex h-14 flex-col items-center justify-center gap-1 border-x border-line text-[10px] font-semibold tracking-wide text-jade"
        >
          <WhatsAppIcon className="h-4 w-4" />
          WhatsApp
        </a>
        <a
          href={`${home}#book`}
          aria-label={copy.cta.book}
          className="flex h-14 flex-col items-center justify-center gap-1 text-[10px] font-semibold tracking-wide text-jade"
        >
          <CalendarIcon className="h-4 w-4" />
          {copy.cta.bookShort}
        </a>
      </div>
    </nav>
  );
}
