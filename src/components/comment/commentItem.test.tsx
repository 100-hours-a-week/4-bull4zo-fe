import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as commentQueries from '@/api/services/comment/queries'
import { QueryProvider } from '@/app/QueryProvider'
import { CommentItem } from './commentItem'

// 🧪 목 데이터
const baseComment = {
  authorNickname: '테스터',
  content: '이것은 댓글 내용입니다.',
  createdAt: new Date().toISOString(),
  commentId: 1,
  isMine: true,
}

vi.mock('@/utils/time', () => ({
  formatRelativeTime: vi.fn(() => '1분 전'),
}))

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}))

describe('<CommentItem />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('댓글 내용이 제대로 렌더링된다', () => {
    render(
      <MemoryRouter initialEntries={['/vote/123']}>
        <Routes>
          <Route path="/vote/:voteId" element={<CommentItem {...baseComment} />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByText('테스터')).toBeInTheDocument()
    expect(screen.getByText('이것은 댓글 내용입니다.')).toBeInTheDocument()
    expect(screen.getByText('1분 전')).toBeInTheDocument()
  })

  it('작성자 본인이면 삭제 버튼이 나타난다', async () => {
    render(
      <MemoryRouter initialEntries={['/vote/123']}>
        <Routes>
          <Route
            path="/vote/:voteId"
            element={
              <QueryProvider>
                <CommentItem {...baseComment} />
              </QueryProvider>
            }
          />
        </Routes>
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByText('삭제하기')).toBeInTheDocument()
    })
  })

  it('작성자가 아닌 경우 신고/숨기기 버튼이 나타난다', async () => {
    const notMine = { ...baseComment, isMine: false }

    render(
      <MemoryRouter initialEntries={['/vote/123']}>
        <Routes>
          <Route
            path="/vote/:voteId"
            element={
              <QueryProvider>
                <CommentItem {...notMine} />
              </QueryProvider>
            }
          />
        </Routes>
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByText('댓글 숨기기')).toBeInTheDocument()
      expect(screen.getByText('신고하기')).toBeInTheDocument()
    })
  })

  it('외부 클릭 시 메뉴가 닫힌다', async () => {
    render(
      <div>
        <MemoryRouter initialEntries={['/vote/123']}>
          <Routes>
            <Route
              path="/vote/:voteId"
              element={
                <QueryProvider>
                  <CommentItem {...baseComment} />
                </QueryProvider>
              }
            />
          </Routes>
        </MemoryRouter>
        <div data-testid="outside">바깥</div>
      </div>,
    )

    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByText('삭제하기')).toBeInTheDocument()
    })

    fireEvent.mouseDown(screen.getByTestId('outside'))

    await waitFor(() => {
      expect(screen.queryByText('삭제하기')).not.toBeInTheDocument()
    })
  })

  it('삭제하기 버튼 클릭 시 mutation 함수가 호출된다', async () => {
    const mockMutate = vi.fn().mockResolvedValue({})
    vi.spyOn(commentQueries, 'useDeleteCommentMutation').mockReturnValue({
      mutateAsync: mockMutate,
    } as any)

    render(
      <MemoryRouter initialEntries={['/vote/123']}>
        <Routes>
          <Route
            path="/vote/:voteId"
            element={
              <QueryProvider>
                <CommentItem {...baseComment} />
              </QueryProvider>
            }
          />
        </Routes>
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByText('삭제하기')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('삭제하기'))

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(1)
    })
  })
})
