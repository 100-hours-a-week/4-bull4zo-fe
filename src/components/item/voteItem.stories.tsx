import { unstable_HistoryRouter as Router } from 'react-router-dom'
import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'
import { createMemoryHistory } from 'history'
import { ParticipatedVote } from '@/api/services/vote/model'
import { formatRelativeTime } from '@/utils/time'
import { VoteItem } from './voteItem'

const rawHistory = createMemoryHistory({ initialEntries: ['/research'] })
const history = rawHistory as any

const meta: Meta<typeof VoteItem> = {
  title: 'Components/VoteItem',
  component: VoteItem,
  decorators: [
    (Story) => (
      <Router history={history}>
        <ul className="w-[450px]">
          <Story />
        </ul>
      </Router>
    ),
  ],
  args: {
    voteId: 123,
    content: '스토리북 테스트용 투표입니다',
    closedAt: '2025-05-27T10:00:00.000Z',
    createdAt: '2025-05-20T09:00:00.000Z',
    groupId: 1,
    results: [
      { optionNumber: 1, count: 10, ratio: 60 },
      { optionNumber: 2, count: 5, ratio: 40 },
    ],
  } as ParticipatedVote,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    content: {
      control: 'text',
      description: '아이템 내용',
    },
    createdAt: {
      control: 'date',
      description: '투표 생성 시간',
    },
    closedAt: {
      control: 'date',
      description: '투표 종료 시간',
    },
    voteStatus: {
      control: {
        type: 'inline-radio',
      },
      options: ['OPEN', 'CLOSED', 'PENDING', 'REJECTED'],
      description: '투표 진행 상태',
    },
  },
}
export default meta

type Story = StoryObj<typeof VoteItem>

export const Default: Story = {
  args: {
    voteStatus: 'PENDING',
  },

  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    // 투표 상태가 없는 참여만한 데이터 테스트
    const contentElement = canvas.getByText(args.content!)
    expect(contentElement).toBeInTheDocument()

    // 투표 진행 상태에 따른 테스트
    if (args.voteStatus) {
      if (args.voteStatus === 'OPEN' || args.voteStatus === 'CLOSED') {
        // 기본 데이터 테스트
        expect(canvas.getByText(formatRelativeTime(args.closedAt!))).toBeInTheDocument()
        expect(canvas.getByTestId('item-result')).toBeInTheDocument()
        expect(canvas.getByText('Yes')).toBeInTheDocument()
        expect(canvas.getByText('No')).toBeInTheDocument()

        // 클릭 시 이동 테스트
        contentElement.click()
        expect(history.location.pathname).toBe(`/research/${args.voteId}`)

        // 상태에 따른 추가 라벨 테스트
        if (args.voteStatus === 'OPEN') {
          expect(canvas.getByText('진행중')).toBeInTheDocument()
        } else if (args.voteStatus === 'CLOSED') {
          expect(canvas.getByText('종료됨')).toBeInTheDocument()
        }
      } else if (args.voteStatus === 'PENDING') {
        expect(canvas.getByText('검토중')).toBeInTheDocument()
      } else if (args.voteStatus === 'REJECTED') {
        expect(canvas.getByText('등록 실패')).toBeInTheDocument()
      }
    }
  },
}
