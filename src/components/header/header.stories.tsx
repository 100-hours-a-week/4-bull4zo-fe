import { unstable_HistoryRouter as Router } from 'react-router-dom'
import type { StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { createMemoryHistory } from 'history'
import { QueryProvider } from '@/app/QueryProvider'
import { useUserStore } from '@/stores/userStore'
import { Header } from './header'

interface StoryArgs {
  isLogin: boolean
}

const rawHistory = createMemoryHistory({ initialEntries: ['/'] })
const history = rawHistory as any

const meta = {
  title: 'Components/Header',
  component: Header,
  args: {
    isLogin: false,
  } as StoryArgs,
  decorators: [
    (Story: any, context: any) => {
      const args = context.args as StoryArgs
      useUserStore.setState({ isLogin: args.isLogin })
      return (
        <Router history={history}>
          <QueryProvider>
            <Story />
          </QueryProvider>
        </Router>
      )
    },
  ],
  argTypes: {
    isLogin: {
      control: 'boolean',
      description: '로그인 여부',
    },
  },
  tags: ['unit test'],
}
export default meta

type Story = StoryObj<StoryArgs>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const loginBtn = await canvas.findByRole('button', { name: /로그인/ })
    await userEvent.click(loginBtn)

    expect(history.location.pathname).toBe('/login')
  },
}
