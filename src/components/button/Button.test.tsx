// src/components/Button.test.tsx
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('버튼이 label 텍스트를 렌더링한다', () => {
    render(<Button label="테스트 버튼" />)
    expect(screen.getByText('테스트 버튼')).toBeInTheDocument()
  })

  it('onClick 이벤트가 호출된다', () => {
    const handleClick = vi.fn()
    render(<Button label="클릭" onClick={handleClick} />)
    fireEvent.click(screen.getByText('클릭'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
