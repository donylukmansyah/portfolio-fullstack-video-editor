export function isSafeHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function toSafeHttpUrl(value?: string | null) {
  if (!value || !isSafeHttpUrl(value)) {
    return null;
  }

  return new URL(value).href;
}
