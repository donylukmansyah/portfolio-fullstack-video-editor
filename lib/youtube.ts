/**
 * Extract a YouTube video ID from various URL formats
 * and return an embeddable URL with autoplay enabled.
 *
 * Supported formats:
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
export function getYouTubeEmbedUrl(url: string): string {
  if (!url) return "";

  let videoId = "";

  if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0] ?? "";
  } else if (url.includes("youtube.com/watch")) {
    try {
      videoId = new URL(url).searchParams.get("v") || "";
    } catch {
      // Invalid URL — ignored
    }
  } else if (url.includes("youtube.com/embed/")) {
    videoId = url.split("youtube.com/embed/")[1]?.split("?")[0] ?? "";
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : "";
}
