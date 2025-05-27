import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Vote } from '@/api/services/vote/model'
import META_ICON from '@/assets/meta_icon.png'
import formatTime from '@/lib/formatTime'
import { VoteCard } from './voteCard'

describe('VoteCard 컴포넌트', () => {
  const defaultProps: Partial<Vote> = {
    authorNickname: '테스트유저',
    adminVote: 1,
    closedAt: '2025-05-27T10:00:00.000Z',
    content: '투표 내용입니다.\n여러 줄 테스트',
    imageUrl: 'https://example.com/image.jpg',
  }

  it('작성자 닉네임이 잘 표시된다', () => {
    render(<VoteCard {...defaultProps} />)
    expect(screen.getByText('테스트유저')).toBeInTheDocument()
  })

  it('adminVote가 1이면 META_ICON이 표시된다', () => {
    render(<VoteCard {...defaultProps} />)
    const svg = screen.getByAltText('공인 뱃지') as HTMLImageElement
    expect(svg).toBeInTheDocument()
    expect(svg.src).toContain(META_ICON)
  })

  it('adminVote가 0이면 META_ICON이 표시되지 않는다', () => {
    defaultProps.adminVote = 0
    render(<VoteCard {...defaultProps} />)
    expect(screen.queryByAltText('공인 뱃지')).not.toBeInTheDocument()
  })

  it('종료 시간이 형식에 맞게 표시된다', () => {
    render(<VoteCard {...defaultProps} />)
    expect(screen.getByText(formatTime(defaultProps.closedAt!))).toBeInTheDocument()
  })

  it('내용이 줄바꿈 포함하여 표시된다', () => {
    render(<VoteCard {...defaultProps} />)
    expect(screen.getByText(/투표 내용입니다\.\s*여러 줄 테스트/)).toBeInTheDocument()
  })
})
