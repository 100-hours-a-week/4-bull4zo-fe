import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { vi } from 'vitest'
import { QueryProvider } from '@/app/QueryProvider'
import { CommentInput } from './commentInput'

// 🧪 ✅ useParams mocking
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => ({ voteId: '123' }),
  }
})

const meta: Meta<typeof CommentInput> = {
  title: 'Components/CommentInput',
  component: CommentInput,
  args: {
    content: '',
  },
  decorators: [
    (Story: any) => {
      return (
        <MemoryRouter initialEntries={['/vote/123']}>
          <QueryProvider>
            <Routes>
              <Route
                path="/vote/:voteId"
                element={
                  <div>
                    <Story />
                  </div>
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

type Story = StoryObj<typeof CommentInput>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // 댓글 입력 존재 여부
    expect(await canvas.findByRole('textbox', { name: '댓글 입력' })).toBeInTheDocument()
    // 댓글 작성 버튼 존재 여부
    expect(await canvas.findByRole('button', { name: '댓글 작성' })).toBeInTheDocument()
    // 댓글 테스트 활성화 여부
    const inputField = await canvas.findByRole('textbox', { name: '댓글 입력' })
    await userEvent.type(inputField, '테스트 댓글')
    // 댓글 작성 버튼 활성화 여부
    await canvas.findByRole('button', { name: '댓글 작성' })
  },
}
