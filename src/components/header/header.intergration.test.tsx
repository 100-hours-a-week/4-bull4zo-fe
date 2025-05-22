import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useUserStore } from '@/stores/userStore'
import * as headerStories from './header.stories'

const { LoggedOut } = composeStories(headerStories)

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('Header 통합 테스트 (Storybook)', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
    useUserStore.setState({ isLogin: false })
  })

  it('LoggedOut: 로그인 버튼 클릭 → /login 이동', async () => {
    render(<LoggedOut />)
    await userEvent.click(screen.getByRole('button', { name: /로그인/ }))
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })
})
