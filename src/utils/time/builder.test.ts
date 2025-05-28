import { describe, expect, it } from 'vitest'
import { buildLocalDateTimeString } from './builder'

describe('buildLocalDateTimeString', () => {
  it('기본값을 사용하여 현재 시각 기준으로 반환한다', () => {
    const result = buildLocalDateTimeString()
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)
  })

  it('지정된 Date, 시간, 분으로 변환한다', () => {
    const date = new Date('2025-05-27T00:00:00Z') // UTC 기준
    const result = buildLocalDateTimeString({
      date,
      hours: 9,
      minutes: 30,
    })
    expect(result).toBe('2025-05-27T09:30')
  })

  it('days를 더해서 날짜가 증가한다', () => {
    const date = new Date('2025-05-27T00:00:00Z')
    const result = buildLocalDateTimeString({
      date,
      days: 2,
      hours: 8,
      minutes: 0,
    })
    expect(result).toBe('2025-05-29T08:00')
  })

  it('분은 1자리도 2자리로 반환한다.', () => {
    const date = new Date('2025-01-01T00:00:00Z')
    const result = buildLocalDateTimeString({
      date,
      hours: 5,
      minutes: 7,
    })
    expect(result).toBe('2025-01-01T05:07')
  })

  it('초 단위는 제거된다.', () => {
    const date = new Date('2025-05-27T15:45:12.999Z')
    const result = buildLocalDateTimeString({
      date,
      hours: 10,
      minutes: 15,
    })
    expect(result).toBe('2025-05-28T10:15')
  })
})
