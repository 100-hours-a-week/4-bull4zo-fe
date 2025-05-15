import '@testing-library/jest-dom'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useUserStore } from '@/stores/userStore'
import Navigation from './navigation'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', () => ({ useNavigate: () => mockNavigate }))

describe('Navigation 컴포넌트', () => {
  beforeEach(() => {
    cleanup()
    mockNavigate.mockClear()
    useUserStore.setState({ isLogin: true })
  })

  it('Navigation 버튼 클릭시 home 이동 확인', () => {
    render(<Navigation />)
    const btn = screen.getByRole('button', { name: 'home' })
    expect(btn).toBeInTheDocument()

    fireEvent.click(btn)
    expect(mockNavigate).toHaveBeenCalledWith('/home')
  })
})
