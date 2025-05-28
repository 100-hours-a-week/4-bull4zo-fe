import { unstable_HistoryRouter as Router } from 'react-router-dom'
import { userEvent } from '@storybook/test'
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { afterEach } from 'node:test'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fullReset } from '@/lib/fullReset'
import * as trackModule from '@/lib/trackEvent'
import { useGroupStore } from '@/stores/groupStore'

const fakeFetchNext = vi.fn()

const infiniteQueryMock = {
  data: {
    pages: [
      {
        groups: [
          { groupId: 1, name: 'A' },
          { groupId: 2, name: 'B' },
        ],
      },
      { groups: [{ groupId: 3, name: 'C' }] },
    ],
  },
  isSuccess: true,
  fetchNextPage: fakeFetchNext,
  hasNextPage: true,
  isFetchingNextPage: false,
}

const trackSpy = vi.spyOn(trackModule, 'trackEvent')

class MockIO {
  cb: any
  constructor(cb: any) {
    this.cb = cb
  }
  observe() {
    this.cb([{ isIntersecting: true } as any], this)
  }
  unobserve() {}
}
describe('GroupDropDown 성공 단위 테스트', () => {
  const rawHistory = createMemoryHistory({ initialEntries: ['/'] })
  let history = rawHistory as any
  const originalIO = globalThis.IntersectionObserver

  beforeEach(() => {
    vi.resetAllMocks()
    vi.stubGlobal('IntersectionObserver', MockIO)
    vi.doMock('@/api/services/user/group/quries', () => ({
      useInfiniteGroupNameListQuery: () => ({
        ...infiniteQueryMock,
        isError: false,
      }),
    }))

    useGroupStore.setState({ groups: [], selectedId: 0 })

    trackSpy.mockClear()
    fakeFetchNext.mockClear()

    history = createMemoryHistory({ initialEntries: ['/home'] })
  })
  afterEach(() => {
    vi.stubGlobal('IntersectionObserver', originalIO)
  })

  // 초기 렌더링 테스트
  it('초기 렌더링: 버튼에 "전체"가 보이고 메뉴는 닫혀 있다', async () => {
    const { GroupDropDown } = await import('./groupDropDown')

    render(
      <Router history={history}>
        <GroupDropDown />
      </Router>,
    )

    const btn = screen.getByRole('button')
    expect(btn.textContent).toContain('전체')
    expect(screen.queryByRole('menu')).toBeNull()
  })
  // make 이외에 페이지에 첫번째 그룹으로 "전체"자동 추가 테스트
  it('"/make" 가 아닌 경로면 useEffect로 전체+A,B,C 그룹 세팅', async () => {
    const { GroupDropDown } = await import('./groupDropDown')

    render(
      <Router history={history}>
        <GroupDropDown />
      </Router>,
    )

    await waitFor(() => {
      const names = useGroupStore.getState().groups.map((g) => g.name)
      expect(names).toEqual(['전체', 'A', 'B', 'C'])
    })
  })
  // "make"페이지의 경우 "전체" 자동 제거 테스트
  it('"/make" 경로면 "전체" 옵션이 빠진다', async () => {
    const { GroupDropDown } = await import('./groupDropDown')

    history.replace('/make')
    render(
      <Router history={history}>
        <GroupDropDown />
      </Router>,
    )

    await waitFor(() => {
      const names = useGroupStore.getState().groups.map((g) => g.name)
      expect(names).toEqual(['A', 'B', 'C'])
    })
  })
  // 드롭다운 열리는지 테스트
  it('드롭다운 버튼 클릭 시 드롭다운 오픈', async () => {
    const { GroupDropDown } = await import('./groupDropDown')

    render(
      <Router history={history}>
        <GroupDropDown />
      </Router>,
    )

    const trigger = screen.getByTestId('group-dropdown-trigger')
    await userEvent.click(trigger)

    const content = await within(document.body).findByTestId('group-dropdown-content')
    expect(content).toBeInTheDocument()
  })
  // 드롭 다운 오픈 후 그룹 변경 테스트
  it('드롭다운 열고 B 선택 시 그룹 변경', async () => {
    const { GroupDropDown } = await import('./groupDropDown')

    render(
      <Router history={history}>
        <GroupDropDown />
      </Router>,
    )

    const trigger = screen.getByTestId('group-dropdown-trigger')
    await userEvent.click(trigger)

    await waitFor(async () => {
      const content = await within(document.body).findByTestId('group-dropdown-content')
      expect(content).toBeInTheDocument()
    })

    const itemB = screen.getByTestId('group-item-2')
    await fireEvent.click(itemB)

    expect(useGroupStore.getState().selectedId).toBe(2)
    expect(trackSpy).toHaveBeenCalledWith({
      cta_id: 'group_dropdown_select',
      action: 'select',
      page: '/home',
    })
  })
  // 드롭다운 메뉴에서 무한 스크롤 테스트
  it('메뉴 열 때 IntersectionObserver로 fetchNextPage 호출', async () => {
    const { GroupDropDown } = await import('./groupDropDown')

    render(
      <Router history={history}>
        <GroupDropDown />
      </Router>,
    )

    const trigger = screen.getByTestId('group-dropdown-trigger')
    await userEvent.click(trigger)

    await waitFor(() => {
      expect(fakeFetchNext).toHaveBeenCalled()
    })
  })
})

// 실패 및 예외 케이스
describe('GroupDropDown 실패 및 예외 테스트', () => {
  const rawHistory = createMemoryHistory({ initialEntries: ['/'] })
  let history = rawHistory as any
  const originalIO = globalThis.IntersectionObserver

  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', MockIO)

    fullReset()

    useGroupStore.setState({ groups: [], selectedId: 0 })
    trackSpy.mockClear()
    fakeFetchNext.mockClear()

    history = createMemoryHistory({ initialEntries: ['/home'] })
  })

  afterEach(() => {
    vi.stubGlobal('IntersectionObserver', originalIO)
  })

  // 1. API 500에러 발견 시 그룹 클릭 불가 & '그룹 호출 실패' 표시
  it('API 500에러 발견 시 그룹 클릭 불가, 그룹 호출 실패 표시', async () => {
    vi.resetModules()
    vi.doMock('@/api/services/user/group/quries', () => ({
      useInfiniteGroupNameListQuery: () => ({
        data: undefined,
        isSuccess: false,
        isError: true,
        fetchNextPage: vi.fn(),
        hasNextPage: false,
        isFetchingNextPage: false,
      }),
    }))
    const { GroupDropDown } = await import('./groupDropDown') // 모킹 후 import해야 적용됨

    const history = createMemoryHistory({ initialEntries: ['/home'] }) as any

    render(
      <Router history={history}>
        <GroupDropDown />
      </Router>,
    )

    const trigger = screen.getByTestId('group-dropdown-trigger')
    expect(trigger).toHaveTextContent('그룹 호출 실패')
    expect(trigger).toBeDisabled()
  })

  // 2. IntersectionObserver 동작하지 않을 때 fetchNextPage가 호출되지 않아야 함
  it('IntersectionObserver가 트리거되지 않으면 fetchNextPage가 호출되지 않는다', async () => {
    class SilentIO {
      observe() {}
      unobserve() {}
    }
    vi.stubGlobal('IntersectionObserver', SilentIO)

    const { GroupDropDown } = await import('./groupDropDown')

    render(
      <Router history={history}>
        <>
          <GroupDropDown />
        </>
      </Router>,
    )

    const trigger = screen.getByTestId('group-dropdown-trigger')
    await userEvent.click(trigger)

    await waitFor(() => {
      expect(fakeFetchNext).not.toHaveBeenCalled()
    })
  })

  // 3. 유효하지 않은 groupId 클릭 시 상태 변경되지 않아야 함
  it('존재하지 않는 그룹 항목 클릭 시 selectedId는 변경되지 않는다', async () => {
    const { GroupDropDown } = await import('./groupDropDown')

    render(
      <Router history={history}>
        <GroupDropDown />
      </Router>,
    )

    const trigger = screen.getByTestId('group-dropdown-trigger')
    await userEvent.click(trigger)

    const fakeItem = document.createElement('div')
    fakeItem.dataset.testid = 'group-item-999'
    fakeItem.click()

    expect(useGroupStore.getState().selectedId).toBe(0)
  })
})
