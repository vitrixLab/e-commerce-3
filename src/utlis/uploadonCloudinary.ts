// MVP mock: avatars are never uploaded anywhere, the source URL is kept as-is.

export const uploadFromUrlToCloudinary = async (
  imageUrl: string,
  _userId: string,
): Promise<string> => imageUrl;
