import { unstable_HistoryRouter as Router } from 'react-router-dom'
import type { StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { createMemoryHistory } from 'history'
import { Tab, useNavigationStore } from '@/stores/navigationStore'
import { useUserStore } from '@/stores/userStore'
import Navigation from './navigation'

interface StroyArgs {
  isLogin: boolean
  tab: Tab
}

const rawHistory = createMemoryHistory({ initialEntries: ['/'] })
const history = rawHistory as any

const meta = {
  title: 'Components/Navigation',
  component: Navigation,
  args: {
    isLogin: false,
    tab: 'home',
  } as StroyArgs,
  decorators: [
    (Story: any, context: any) => {
      const args = context.args as StroyArgs
      useUserStore.setState({ isLogin: args.isLogin })
      useNavigationStore.setState({ tab: args.tab })
      return (
        <Router history={history}>
          <Story />
        </Router>
      )
    },
  ],
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

type Story = StoryObj<StroyArgs>

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    const makeBtn = await canvas.getByRole('button', { name: /make/i })
    await userEvent.click(makeBtn)

    if (args.isLogin) {
      expect(history.location.pathname).toBe('/make')
    } else {
      expect(history.location.pathname).toBe('/')
    }
  },
}
