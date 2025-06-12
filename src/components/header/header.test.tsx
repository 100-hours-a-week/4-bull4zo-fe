import '@testing-library/jest-dom'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { QueryProvider } from '@/app/QueryProvider'
import { useUserStore } from '@/stores/userStore'
import Header from './header'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: '/' }),
}))

describe('Header 컴포넌트', () => {
  beforeEach(() => {
    cleanup()
    mockNavigate.mockClear()
    useUserStore.setState({ isLogin: false })
  })

  it('로그아웃 상태면 버튼 보이고 클릭 시 /login', () => {
    render(
      <QueryProvider>
        <Header />
      </QueryProvider>,
    )
    const btn = screen.getByRole('button', { name: '로그인' })
    expect(btn).toBeInTheDocument()

    fireEvent.click(btn)
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })
})
