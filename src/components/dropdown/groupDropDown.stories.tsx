import { unstable_HistoryRouter as Router } from 'react-router-dom'
import type { StoryObj } from '@storybook/react'
import { expect, userEvent, waitFor, within } from '@storybook/test'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createMemoryHistory } from 'history'
import { authAxiosInstance } from '@/api/axios'
import { groupHandlers } from '@/mocks/handlers/groupHandlers'
import { useGroupStore } from '@/stores/groupStore'
import { Tab, useNavigationStore } from '@/stores/navigationStore'
import { useUserStore } from '@/stores/userStore'
import { GroupDropDown } from './groupDropDown'

interface StoryArgs {
  isLogin: boolean
  tab: Tab
}

const queryClient = new QueryClient()

const meta = {
  title: 'Components/GroupDropDown',
  component: GroupDropDown,
  args: {
    isLogin: true,
    tab: 'home',
  } as StoryArgs,
  decorators: [
    (Story: any, context: any) => {
      const args = context.args as StoryArgs

      useUserStore.setState({ isLogin: args.isLogin, accessToken: 'kakao-auth-code' })
      useNavigationStore.setState({ tab: args.tab })
      useGroupStore.setState({ groups: [], selectedId: 0 })

      authAxiosInstance.defaults.baseURL = window.location.origin
      authAxiosInstance.defaults.headers.common['Authorization'] = 'kakao-auth-code'

      const dynamicHistory = createMemoryHistory({
        initialEntries: [args.tab === 'make' ? '/make' : '/home'],
      })
      const history = dynamicHistory as any

      return (
        <QueryClientProvider client={queryClient}>
          <Router history={history}>
            <Story />
          </Router>
        </QueryClientProvider>
      )
    },
  ],
  parameters: {
    msw: {
      handlers: groupHandlers,
    },
  },
  argTypes: {
    isLogin: {
      control: 'boolean',
      description: '로그인 여부',
    },
    tab: {
      control: {
        type: 'inline-radio',
      },
      options: ['home', 'make', 'research', 'user'],
      description: '현재 선택된 탭',
    },
  },
  tags: ['unit test'],
}
export default meta

type Story = StoryObj<StoryArgs>

export const Default: Story = {
  args: {
    isLogin: true,
    tab: 'make',
  },

  play: async ({ canvasElement, args }) => {
    // 1. 로그인 정보 없으면 보이지 않음
    if (!args.isLogin) {
      return
    }

    const canvas = within(canvasElement)

    // 2. 드롭다운 버튼 클릭
    const dropDownBtn = await canvas.getByTestId('group-dropdown-trigger')
    await userEvent.click(dropDownBtn)

    // 3. 드롭다운 메뉴 열렸는지 확인
    const menu = await within(document.body).findByTestId('group-dropdown-content')
    expect(menu).toBeInTheDocument()

    // 4. 항목 목록이 제대로 렌더링되었는지 확인
    const groupItems = ['group-item-1', 'group-item-2']
    for (const testId of groupItems) {
      const item = await within(menu).findByTestId(testId)
      await waitFor(() => expect(item).toBeVisible())
    }

    // 5. 그룹 B 선택
    const itemB = await within(menu).findByTestId('group-item-2')
    await userEvent.click(itemB)

    // 6. 상태가 업데이트되었는지 확인
    const selectedId = useGroupStore.getState().selectedId
    expect(selectedId).toBe(2)

    // 7. 경로가 "/make"일 때 "전체"가 없어야 하는지 확인
    if (args.tab === 'make') {
      await waitFor(() => {
        const groupNames = useGroupStore.getState().groups.map((g) => g.name)
        expect(groupNames.includes('전체')).toBe(false)
      })
    } else {
      const groupNames = useGroupStore.getState().groups.map((g) => g.name)
      expect(groupNames[0]).toBe('전체')
    }
  },
}
