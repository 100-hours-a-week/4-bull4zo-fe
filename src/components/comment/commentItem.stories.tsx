import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { QueryProvider } from '@/app/QueryProvider'
import { CommentItem } from './commentItem'

const baseComment = {
  authorNickname: '테스터',
  content: '이것은 테스트용 댓글입니다.',
  createdAt: new Date().toISOString(),
  commentId: 1,
  isMine: true,
}

const meta: Meta<typeof CommentItem> = {
  title: 'Components/CommentItem',
  component: CommentItem,
  args: baseComment,
  decorators: [
    (Stor: any) => {
      return (
        <MemoryRouter initialEntries={['/vote/123']}>
          <QueryProvider>
            <Routes>
              <Route
                path="/vote/:voteId"
                element={
                  <ul>
                    <Stor />
                  </ul>
                }
              />
            </Routes>
          </QueryProvider>
        </MemoryRouter>
      )
    },
  ],
  tags: ['unit test'],
}
export default meta

type Story = StoryObj<typeof CommentItem>

export const MyComment: Story = {
  args: {
    ...baseComment,
    isMine: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    expect(await canvas.findByText('테스터')).toBeInTheDocument()
    expect(await canvas.findByText('이것은 테스트용 댓글입니다.')).toBeInTheDocument()

    const menuBtn = await canvas.findByRole('button', { name: '댓글 메뉴 열기' })
    await userEvent.click(menuBtn)

    expect(await canvas.findByText('삭제하기')).toBeInTheDocument()
  },
}

export const OthersComment: Story = {
  args: {
    ...baseComment,
    isMine: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    expect(await canvas.findByText('테스터')).toBeInTheDocument()
    expect(await canvas.findByText('이것은 테스트용 댓글입니다.')).toBeInTheDocument()

    const menuBtn = await canvas.findByRole('button', { name: '댓글 메뉴 열기' })
    await userEvent.click(menuBtn)

    expect(await canvas.findByText('댓글 숨기기')).toBeInTheDocument()
    expect(await canvas.findByText('신고하기')).toBeInTheDocument()
  },
}
