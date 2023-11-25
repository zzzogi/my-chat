export function extractMediaType(url: string) {
  const parts = url.split("/");
  const mediaIndex = parts.findIndex(
    (part) => part === "image" || part === "video"
  );
  return mediaIndex !== -1 ? parts[mediaIndex] : null;
}
