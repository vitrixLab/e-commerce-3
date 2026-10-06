import { mockUploadedUrl } from "@/utlis/mockUpload";

const mimeOf = (filename?: string) => {
  const ext = filename?.split(".").pop()?.toLowerCase();
  if (ext === "png") return "image/png";
  if (ext === "webp") return "image/webp";
  return "image/jpeg";
};

export const uploadMainProductImage = async (
  buffer: Buffer,
  _productId?: string,
  filename?: string,
): Promise<string> => mockUploadedUrl(buffer, mimeOf(filename));

export const uploadColorProductImage = async (
  buffer: Buffer,
  _productId?: string,
  _color?: string,
  filename?: string,
): Promise<string> => mockUploadedUrl(buffer, mimeOf(filename));
