type ChapterNavProps = {
  items: Array<{ id: string; label: string }>;
  label: string;
};

export function ChapterNav({ items, label }: ChapterNavProps) {
  return (
    <nav
      aria-label={label}
      className="sticky top-[4.5rem] z-30 border-y border-line bg-paper/95 backdrop-blur-md md:top-[7rem]"
    >
      <div className="container-page no-scrollbar flex gap-6 overflow-x-auto py-3.5">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/70 transition hover:text-jade"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
