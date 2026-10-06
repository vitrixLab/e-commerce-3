// Mock upload helper: turns an uploaded file into an inline data URL so the
// MVP never talks to Cloudinary (or any other storage API).

const MAX_INLINE_BYTES = 2 * 1024 * 1024;
const FALLBACK_IMAGE = "/fourbyfive.png";

export function mockUploadedUrl(
  buffer: Buffer,
  mimeType = "image/jpeg",
  fallback: string = FALLBACK_IMAGE,
): string {
  if (!buffer?.length) return fallback;
  if (buffer.length > MAX_INLINE_BYTES) return fallback;
  return `data:${mimeType};base64,${buffer.toString("base64")}`;
}
