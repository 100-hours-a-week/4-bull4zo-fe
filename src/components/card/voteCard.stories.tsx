import type { StoryObj } from '@storybook/react'
import { expect, waitFor, within } from '@storybook/test'
import { Vote } from '@/api/services/vote/model'
import META_ICON from '@/assets/meta_icon.png'
import formatTime from '@/lib/formatTime'
import { VoteCard } from './voteCard'

const meta = {
  title: 'Components/VoteCard',
  component: VoteCard,
  decorators: [
    (Story: any) => (
      <div className="w-[450px]">
        <Story />
      </div>
    ),
  ],
  args: {
    authorNickname: 'logan',
    adminVote: 0,
    closedAt: '2025-05-27T10:00:00.000Z',
    content: '<<< 네이버 \n 카카오 >>>',
    imageUrl: '',
  } as Vote,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    authorNickname: {
      control: 'text',
      description: '작성자 닉네임',
    },
    adminVote: {
      control: { type: 'inline-radio' },
      options: [0, 1],
      description: '관리자 여부 (0: 일반, 1: 관리자)',
    },
    closedAt: {
      control: 'date',
      description: '투표 종료 시간',
    },
    content: {
      control: 'text',
      description: '투표 내용',
    },
    imageUrl: {
      control: 'text',
      description: '배경 이미지 URL',
    },
  },
}
export default meta

type Story = StoryObj<Vote>

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    // 닉네임이 표시되는지 확인
    await waitFor(() => {
      expect(canvas.getByText(args.authorNickname)).toBeInTheDocument()
    })

    if (args.adminVote === 1) {
      // 공인 뱃지가 표시되는지 확인
      const badge = canvas.getByAltText('공인 뱃지') as HTMLImageElement
      expect(badge).toBeInTheDocument()
      expect(badge.src).toContain(META_ICON)
    }

    // 종료 시간이 올바르게 표시되는지 확인
    const formattedTime = formatTime(args.closedAt!)
    expect(canvas.getByText(formattedTime)).toBeInTheDocument()

    // 내용 전체가 줄바꿈 포함해 잘 렌더링되었는지 확인
    const actualText = canvas.getByTestId('vote-content').textContent
    expect(actualText?.replace(/\n/g, ' ')).toBe(args.content?.replace(/\n/g, ' '))
  },
}
