import { describe, expect, it } from 'vitest'
import { convertToKstISOString } from './timezone'

describe('convertToKstISOString', () => {
  it('UTC 시간을 KST ISO 문자열로 변환한다', () => {
    const input = '2025-05-27T00:00:00.000Z'
    const result = convertToKstISOString(input)

    // KST 기준: 9시간 더함 → 오전 9시
    expect(result).toBe('2025-05-27T09:00:00.000Z')
  })

  it('올바른 ISO 8601 형식으로 반환한다', () => {
    const input = '2025-01-01T15:30:00.000Z'
    const result = convertToKstISOString(input)

    // 정규식으로 ISO 형식 확인
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
  })
})
