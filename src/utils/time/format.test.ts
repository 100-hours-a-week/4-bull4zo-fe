import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { formatDateTimeDetail, formatRelativeTime } from './format'

// 현재 시간: 2025-05-27 10:00
const fixedNow = new Date('2025-05-27T01:00:00Z')

describe('formatRelativeTime', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(fixedNow)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('1시간 이내일 경우 분 단위로 표시한다', () => {
    const timestamp = '2025-05-27T00:40:00' // KST 09:40
    expect(formatRelativeTime(timestamp)).toBe('20분 전')
  })

  it('4시간 이내일 경우 시간 단위로 표시한다', () => {
    const timestamp = '2025-05-26T22:00:00' // KST 07:00
    expect(formatRelativeTime(timestamp)).toBe('3시간 전')
  })

  it('같은 해일 경우 날짜/시간 포맷으로 반환한다', () => {
    const timestamp = '2025-05-01T05:00:00' // KST 14:00
    expect(formatRelativeTime(timestamp)).toBe('05/01 14:00')
  })

  it('다른 해일 경우 연도 포함 포맷으로 반환한다', () => {
    const timestamp = '2024-12-25T00:00:00' // KST 09:00
    expect(formatRelativeTime(timestamp)).toBe('24/12/25 09:00')
  })

  it('미래 시간이면 분 후 종료로 표시한다', () => {
    const timestamp = '2025-05-27T01:30:00' // KST 10:30
    expect(formatRelativeTime(timestamp)).toBe('30분 후 종료')
  })

  it('미래 시간이면서 24시간 이내면 시간 후 종료', () => {
    const timestamp = '2025-05-27T03:00:00' // KST 12:00
    expect(formatRelativeTime(timestamp)).toBe('2시간 후 종료')
  })

  it('미래 시간이 24시간 이상이면 일 후 종료', () => {
    const timestamp = '2025-05-29T01:00:00' // KST 10:00
    expect(formatRelativeTime(timestamp)).toBe('2일 후 종료')
  })
})

describe('formatDateTimeDetail', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(fixedNow)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('같은 해이면 월/일 시:분 반환', () => {
    const timestamp = '2025-03-15T07:45:00' // KST 16:45
    expect(formatDateTimeDetail(timestamp)).toBe('03/15 16:45')
  })

  it('다른 해이면 연/월/일 시:분 반환', () => {
    const timestamp = '2024-12-25T00:00:00' // KST 09:00
    expect(formatDateTimeDetail(timestamp)).toBe('2024/12/25 09:00')
  })
})
