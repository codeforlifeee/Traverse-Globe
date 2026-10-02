import { useState } from "react";
import { cn } from "@/lib/utils";
import { resolveImageUrl, buildSrcSet } from "@/lib/sanityImage";

/**
 * Broken-image safe replacement for <img>. Falls back to a branded placeholder
 * if the src fails to load. DESIGN.md §2.3 — a broken image destroys trust.
 *
 * Pass `sizes` to opt into a responsive srcSet; without it a single width is served.
 */
export default function ImageWithFallback({
  src,
  alt = "",
  className,
  fallbackClassName,
  aspect,
  loading = "lazy",
  fetchpriority,
  width,
  height,
  sizes,
  widths,
  quality,
  ...rest
}) {
  const [errored, setErrored] = useState(false);

  const responsive = sizes ? buildSrcSet(src, { widths, quality }) : null;
  const resolvedSrc = responsive
    ? responsive.src
    : resolveImageUrl(src, { width, height, quality });

  const aspectCls = aspect
    ? { "4/3": "aspect-[4/3]", "16/9": "aspect-[16/9]", "1/1": "aspect-square", "3/2": "aspect-[3/2]" }[aspect]
    : "";

  if (!resolvedSrc || errored) {
    return (
      <div
        role="img"
        aria-label={alt || "Image unavailable"}
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-brand-canvas-2 to-brand-hairline text-brand-muted-ink",
          aspectCls,
          className,
          fallbackClassName
        )}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 opacity-60" aria-hidden="true">
          <path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M4 16l4-4 3 3 5-5 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
          <circle cx="9" cy="9" r="1.5" fill="currentColor" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={resolvedSrc}
      srcSet={responsive?.srcSet || undefined}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={loading}
      decoding="async"
      fetchpriority={fetchpriority}
      onError={() => setErrored(true)}
      className={cn(aspectCls, "object-cover", className)}
      {...rest}
    />
  );
}
