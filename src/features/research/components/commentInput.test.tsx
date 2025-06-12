import { BrowserRouter } from 'react-router-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CommentInput } from './commentInput'

// mock useParams
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => ({ voteId: '123' }),
  }
})

// mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver

// mock mutation
const mutateAsyncMock = vi.fn()
vi.mock('@/api/services/comment/queries', async () => {
  const actual = await vi.importActual('@/api/services/comment/queries')
  return {
    ...actual,
    useCreateCommentMutation: () => ({
      mutateAsync: mutateAsyncMock,
    }),
  }
})

describe('CommentInput', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const setup = () =>
    render(
      <BrowserRouter>
        <CommentInput />
      </BrowserRouter>,
    )

  it('전송 버튼, 텍스트 area 렌더링', () => {
    setup()
    expect(screen.getByPlaceholderText('댓글을 입력해주세요.')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('익명 여부 체크 가능', async () => {
    setup()
    const anonymousToggle = screen.getByText('익명')
    fireEvent.click(anonymousToggle)
    expect(screen.getByText('실명')).toBeInTheDocument()
  })

  it('텍스트 area 입력 가능 여부', () => {
    setup()
    const textarea = screen.getByPlaceholderText('댓글을 입력해주세요.')
    fireEvent.change(textarea, { target: { value: '테스트 댓글' } })
    expect(textarea).toHaveValue('테스트 댓글')
  })

  it('전송 및 enter 데스크탑', async () => {
    setup()
    const textarea = screen.getByPlaceholderText('댓글을 입력해주세요.')
    fireEvent.change(textarea, { target: { value: '엔터 테스트' } })
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false })
    await waitFor(() => {
      expect(mutateAsyncMock).toHaveBeenCalledWith({
        content: '엔터 테스트',
        anonymous: true,
      })
    })
  })

  it('전송 버튼 클릭 모바일', async () => {
    setup()
    const textarea = screen.getByPlaceholderText('댓글을 입력해주세요.')
    fireEvent.change(textarea, { target: { value: '버튼 테스트' } })

    const button = screen.getByRole('button')
    fireEvent.click(button)

    await waitFor(() => {
      expect(mutateAsyncMock).toHaveBeenCalledWith({
        content: '버튼 테스트',
        anonymous: true,
      })
    })
  })
})
