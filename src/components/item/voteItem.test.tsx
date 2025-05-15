import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ParticipatedVote } from '@/api/services/vote/model'
import { formatRelativeTime } from '@/utils/time'
import { VoteItem } from './voteItem'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('VoteItem', () => {
  const baseVote = {
    voteId: 123,
    content: '테스트 투표입니다',
    closedAt: '2025-05-27T10:00:00.000Z',
    groupId: 1,
    createdAt: '2025-05-20T09:00:00.000Z',
    results: [
      { optionNumber: 1, count: 10, ratio: 60 },
      { optionNumber: 2, count: 5, ratio: 40 },
    ],
  } as ParticipatedVote

  it('종료 시간이 형식에 맞게 표시된다', () => {
    renderWithRouter(<VoteItem {...baseVote} />)
    expect(screen.getByText(formatRelativeTime(baseVote.closedAt!))).toBeInTheDocument()
  })

  it('renders OPEN 상태', () => {
    baseVote.voteStatus = 'OPEN'
    renderWithRouter(<VoteItem {...baseVote} />)
    expect(screen.getByText('진행중')).toBeInTheDocument()
    expect(screen.getByText('Yes')).toBeInTheDocument()
    expect(screen.getByText('No')).toBeInTheDocument()
  })

  it('renders CLOSED 상태', () => {
    baseVote.voteStatus = 'CLOSED'
    renderWithRouter(<VoteItem {...baseVote} />)
    expect(screen.getByText('종료됨')).toBeInTheDocument()
  })

  it('renders PENDING 상태 및 툴팁 동작', () => {
    baseVote.voteStatus = 'PENDING'
    renderWithRouter(<VoteItem {...baseVote} />)
    const label = screen.getByText('검토중')
    expect(label).toBeInTheDocument()

    fireEvent.click(label)
    expect(screen.getByText(/간단히 검토한 뒤 공개돼요/)).toBeInTheDocument()
  })

  it('renders REJECTED 상태', () => {
    baseVote.voteStatus = 'REJECTED'
    renderWithRouter(<VoteItem {...baseVote} />)
    expect(screen.getByText('등록 실패')).toBeInTheDocument()
  })

  it('클릭 시 상세 페이지 이동 (PENDING, REJECTED 제외)', () => {
    const { rerender } = renderWithRouter(<VoteItem {...baseVote} voteStatus="OPEN" />)
    fireEvent.click(screen.getByText('테스트 투표입니다'))
    expect(mockNavigate).toHaveBeenCalledWith('/research/123')

    rerender(<VoteItem {...baseVote} voteStatus="PENDING" />)
    fireEvent.click(screen.getByText('검토중'))
    expect(mockNavigate).toHaveBeenCalledTimes(1)
  })
})
