import { LeadForm } from "@/components/forms/LeadForm";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { formCopy } from "@/content/forms";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/content/types";
import { contact, telHref, waLink } from "@/lib/contact";

export function BookSection({ locale }: { locale: Locale }) {
  const copy = formCopy[locale];
  const ui = siteCopy[locale];

  return (
    <section id="book" className="bg-ivory py-20 md:py-28">
      <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="section-title">{copy.title}</h2>
          <p className="section-copy">{copy.intro}</p>

          <div className="mt-8 space-y-3 text-sm">
            <a
              href={telHref(contact.phone24h)}
              className="flex items-center gap-3 text-ink transition hover:text-jade"
            >
              <PhoneIcon className="h-4 w-4 text-jade" />
              {contact.phone24hDisplay}
            </a>
            <a
              href={waLink(ui.whatsapp.booking, contact.whatsappBooking)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-ink transition hover:text-jade"
            >
              <WhatsAppIcon className="h-4 w-4 text-jade" />
              {ui.cta.whatsapp}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-3 text-ink transition hover:text-jade"
            >
              <MailIcon className="h-4 w-4 text-jade" />
              {contact.email}
            </a>
          </div>

          <p className="mt-6 max-w-md text-sm leading-7 text-stone">
            {copy.urgent}
          </p>
        </div>

        <div className="border border-line bg-paper p-5 sm:p-8">
          <LeadForm locale={locale} />
        </div>
      </div>
    </section>
  );
}
