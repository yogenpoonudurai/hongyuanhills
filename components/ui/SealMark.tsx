export function SealMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center border border-gold/60 bg-seal font-display text-sm text-ivory ${className ?? ""}`}
    >
      宏
    </span>
  );
}
