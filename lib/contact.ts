const FALLBACK = {
  whatsappGeneral: "60177333385",
  whatsappEmergency: "60177333385",
  whatsappBooking: "60177333385",
  phone24h: "60177333385",
  phoneOffice: "606077723399",
  phoneOfficeDisplay: "607-772 3399",
  email: "info@hyhills.com",
};

function envOr(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

export function formatPhone(value: string): string {
  const digits = digitsOnly(value);
  if (digits.startsWith("60")) {
    const local = digits.slice(2);
    if (local.length >= 9) {
      return `+60 ${local.slice(0, 2)}-${local.slice(2, 5)} ${local.slice(5)}`;
    }
    return `+60 ${local}`;
  }
  return `+${digits}`;
}

const phone24h = envOr(process.env.NEXT_PUBLIC_PHONE_24H, FALLBACK.phone24h);
const phoneOffice = envOr(
  process.env.NEXT_PUBLIC_PHONE_OFFICE,
  FALLBACK.phoneOffice,
);

export const contact = {
  whatsappGeneral: envOr(
    process.env.NEXT_PUBLIC_WHATSAPP_GENERAL,
    FALLBACK.whatsappGeneral,
  ),
  whatsappEmergency: envOr(
    process.env.NEXT_PUBLIC_WHATSAPP_EMERGENCY,
    FALLBACK.whatsappEmergency,
  ),
  whatsappBooking: envOr(
    process.env.NEXT_PUBLIC_WHATSAPP_BOOKING,
    FALLBACK.whatsappBooking,
  ),
  phone24h,
  phone24hDisplay: formatPhone(phone24h),
  phoneOffice,
  phoneOfficeDisplay:
    process.env.NEXT_PUBLIC_PHONE_OFFICE_DISPLAY?.trim() ||
    FALLBACK.phoneOfficeDisplay,
  email: envOr(process.env.NEXT_PUBLIC_EMAIL, FALLBACK.email),
};

export function telHref(value: string = contact.phone24h): string {
  return `tel:+${digitsOnly(value)}`;
}

export function waLink(
  message: string,
  value: string = contact.whatsappGeneral,
): string {
  return `https://wa.me/${digitsOnly(value)}?text=${encodeURIComponent(message)}`;
}

export function mapsUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function wazeUrl(address: string): string {
  return `https://waze.com/ul?q=${encodeURIComponent(address)}&navigate=yes`;
}
