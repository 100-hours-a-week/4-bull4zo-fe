export const getDecodedFilenameFromUrl = (url: string): string => {
  if (!url) return ''

  const lastUnderscoreIndex = url.lastIndexOf('_')
  if (lastUnderscoreIndex === -1) return ''

  const encodedPart = url.slice(lastUnderscoreIndex + 1)
  try {
    return decodeURIComponent(encodedPart)
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    return encodedPart // decode 실패하면 원본 반환
  }
}
export const getDecodedUrl = (url: string): string => {
  if (!url) return ''

  const lastUnderscoreIndex = url.lastIndexOf('_')
  if (lastUnderscoreIndex === -1) return url

  const prefix = url.slice(0, lastUnderscoreIndex + 1)
  const encodedPart = url.slice(lastUnderscoreIndex + 1)

  try {
    const decodedFilename = decodeURIComponent(encodedPart)
    return prefix + decodedFilename
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    return url // decode 실패 시 원본 유지
  }
}
