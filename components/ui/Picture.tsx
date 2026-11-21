import { cn } from "@/lib/utils";

type PictureProps = {
  /** Base path without extension, e.g. /images/hero */
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
};

export function Picture({
  src,
  alt,
  width,
  height,
  className,
  imgClassName,
  priority = false,
}: PictureProps) {
  return (
    <picture className={cn("block", className)}>
      <source srcSet={`${src}.webp`} type="image/webp" />
      <img
        src={`${src}.jpg`}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </picture>
  );
}
