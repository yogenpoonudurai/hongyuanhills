import { LotusIcon } from "@/components/ui/Icons";

export function FourGuardians({
  labels,
  label,
}: {
  label: string;
  labels: {
    back: string;
    front: string;
    left: string;
    right: string;
    center: string;
  };
}) {
  const cell =
    "flex min-h-16 items-center justify-center border border-line bg-paper px-3 py-4 text-center text-[11px] font-medium text-ink/75";

  return (
    <div
      className="grid grid-cols-3 gap-2"
      aria-label={label}
    >
      <div />
      <div className={cell}>{labels.back}</div>
      <div />
      <div className={cell}>{labels.left}</div>
      <div className="flex min-h-16 flex-col items-center justify-center gap-2 bg-jade px-3 py-4 text-center text-[11px] font-semibold tracking-[0.08em] text-ivory">
        <LotusIcon className="h-5 w-5 text-gold-light" />
        {labels.center}
      </div>
      <div className={cell}>{labels.right}</div>
      <div />
      <div className={cell}>{labels.front}</div>
      <div />
    </div>
  );
}
