/**
 * content enter 시 자동 15자 추가 계산 함수
 */
export const getContentLength = (text: string) => {
  if (!text) return 0
  const lineBreakCount = (text.match(/\n/g) || []).length
  return text.length + lineBreakCount * 14
}
