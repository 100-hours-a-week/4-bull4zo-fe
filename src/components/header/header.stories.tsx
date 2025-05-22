import { unstable_HistoryRouter as Router } from 'react-router-dom'
import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { createMemoryHistory } from 'history'
import { useUserStore } from '@/stores/userStore'
import Header from './header'

const rawHistory = createMemoryHistory({ initialEntries: ['/'] })
const history = rawHistory as any

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  decorators: [
    (Story) => (
      <Router history={history}>
        <Story />
      </Router>
    ),
  ],
  tags: ['test'],
}
export default meta

type Story = StoryObj<typeof Header>

const mockLoginState = (isLogin: boolean) => {
  useUserStore.setState({ isLogin })
}

export const LoggedOut: Story = {
  render: () => {
    mockLoginState(false)
    return <Header />
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const loginBtn = await canvas.findByRole('button', { name: /로그인/ })
    await userEvent.click(loginBtn)
    expect(history.location.pathname).toBe('/login')
  },
}

export const LoggedIn: Story = {
  render: () => {
    mockLoginState(true)
    return <Header />
  },
}
