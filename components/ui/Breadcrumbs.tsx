import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };

export function Breadcrumbs({
  items,
  label,
  tone = "dark",
}: {
  items: Crumb[];
  label: string;
  tone?: "dark" | "light";
}) {
  return (
    <nav aria-label={label}>
      <ol
        className={cn(
          "flex flex-wrap items-center gap-2 text-[11px] tracking-[0.08em]",
          tone === "dark" ? "text-ivory/70" : "text-stone",
        )}
      >
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? (
              <span
                aria-hidden="true"
                className={tone === "dark" ? "text-ivory/30" : "text-line"}
              >
                /
              </span>
            ) : null}
            {item.href ? (
              <a
                href={item.href}
                className={cn(
                  "transition hover:text-gold-light",
                  tone === "light" && "hover:text-jade",
                )}
              >
                {item.label}
              </a>
            ) : (
              <span
                aria-current="page"
                className={tone === "dark" ? "text-gold-light" : "text-ink"}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
