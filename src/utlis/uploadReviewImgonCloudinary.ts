import { mockUploadedUrl } from "@/utlis/mockUpload";

const mimeOf = (filename?: string) => {
  const ext = filename?.split(".").pop()?.toLowerCase();
  if (ext === "png") return "image/png";
  if (ext === "webp") return "image/webp";
  return "image/jpeg";
};

export const uploadReviewImgonCloudinary = async (
  buffer: Buffer,
  _productId?: string,
  filename?: string,
): Promise<string> => mockUploadedUrl(buffer, mimeOf(filename));
