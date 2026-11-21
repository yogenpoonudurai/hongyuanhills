import type { ReactNode } from "react";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "light" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-gold text-ink hover:bg-gold-light focus-visible:outline-gold",
  secondary:
    "border border-ink/20 text-ink hover:border-gold hover:text-jade",
  light:
    "bg-ivory text-jade-deep hover:bg-gold-light",
  ghost:
    "border border-ivory/30 text-ivory hover:border-gold-light hover:text-gold-light",
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  showArrow?: boolean;
  target?: string;
  rel?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  showArrow = false,
  target,
  rel,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold tracking-wide transition duration-200",
        styles[variant],
        className,
      )}
    >
      <span>{children}</span>
      {showArrow ? <ArrowRightIcon className="h-4 w-4" /> : null}
    </a>
  );
}
