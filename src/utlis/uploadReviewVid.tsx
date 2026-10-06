import { mockUploadedUrl } from "@/utlis/mockUpload";

export const uploadReviewVid = async (
  buffer: Buffer,
  _productId?: string,
  filename?: string,
): Promise<string> =>
  mockUploadedUrl(buffer, "video/mp4", "/review.mp4") || filename || "";
