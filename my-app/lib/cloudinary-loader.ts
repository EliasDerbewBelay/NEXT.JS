import type { ImageLoaderProps } from "next/image";

/**
 * Custom Next.js image loader for Cloudinary.
 *
 * By default, Next.js proxies external images through its own optimizer,
 * which causes upstream timeout errors for Cloudinary URLs. This loader
 * instead builds a Cloudinary URL with native transformation parameters
 * (width, quality, auto-format) so images are served directly from
 * Cloudinary's CDN — no server-side proxying, no timeouts.
 *
 * Example output:
 *   /upload/ → /upload/w_800,q_auto,f_auto/
 */
export default function cloudinaryLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  // Safety fallback: return non-Cloudinary URLs unchanged.
  if (!src.includes("res.cloudinary.com")) {
    return src;
  }

  // Inject transformation parameters between "/upload/" and the rest of the path.
  // f_auto: serve the best format for the browser (WebP, AVIF, etc.)
  // q_auto: let Cloudinary choose the optimal quality level
  // w_N:    resize to the width requested by Next.js <Image sizes>
  const transforms = `w_${width},q_${quality ?? "auto"},f_auto`;
  return src.replace("/upload/", `/upload/${transforms}/`);
}
