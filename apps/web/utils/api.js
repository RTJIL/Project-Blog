export function buildApiUrl(path, baseUrl) {
  return new URL(path, baseUrl).toString()
}
