"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon, CloseIcon } from "@/components/ui/Icons";
import { Picture } from "@/components/ui/Picture";
import type { ImageRef, Locale } from "@/content/types";

const labels = {
  zh: {
    close: "关闭",
    previous: "上一张",
    next: "下一张",
    view: "查看图片",
    gallery: "图片",
  },
  en: {
    close: "Close",
    previous: "Previous image",
    next: "Next image",
    view: "View image",
    gallery: "Image",
  },
} as const;

export function Gallery({
  images,
  locale,
}: {
  images: ImageRef[];
  locale: Locale;
}) {
  const copy = labels[locale];
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (active !== null && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [active]);

  useEffect(() => {
    if (active === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActive((current) =>
          current === null
            ? null
            : (current - 1 + images.length) % images.length,
        );
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActive((current) =>
          current === null ? null : (current + 1) % images.length,
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, images.length]);

  const current = active !== null ? images[active] : null;

  function close() {
    dialogRef.current?.close();
  }

  function step(direction: number) {
    setActive((value) =>
      value === null
        ? null
        : (value + direction + images.length) % images.length,
    );
  }

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`${copy.view}: ${image.alt[locale]}`}
            className="group relative overflow-hidden border border-line bg-paper text-left"
          >
            <Picture
              src={image.src}
              alt={image.alt[locale]}
              width={image.width}
              height={image.height}
              className="aspect-[4/3]"
              imgClassName="transition duration-500 group-hover:scale-[1.03]"
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/65 to-transparent p-3 text-[11px] font-medium text-ivory opacity-0 transition group-hover:opacity-100">
              {copy.view}
            </span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setActive(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
        aria-label={copy.gallery}
        className="m-auto w-[min(94vw,1100px)] max-w-none bg-paper p-0 text-ink"
      >
        {current ? (
          <div className="flex flex-col">
            <div className="flex items-center justify-between border-b border-line px-4 py-2">
              <span className="text-[10px] uppercase tracking-[0.18em] text-stone">
                {copy.gallery} {(active ?? 0) + 1}/{images.length}
              </span>
              <button
                type="button"
                onClick={close}
                aria-label={copy.close}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-jade"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center justify-center bg-ivory p-3">
              <Picture
                src={current.src}
                alt={current.alt[locale]}
                width={current.width}
                height={current.height}
                className="max-h-[72dvh]"
                imgClassName="max-h-[72dvh] w-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label={copy.previous}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-jade"
              >
                <ArrowRightIcon className="h-4 w-4 rotate-180" />
              </button>
              <p className="text-center text-xs leading-6 text-ink/70">
                {current.alt[locale]}
              </p>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label={copy.next}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-jade"
              >
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
