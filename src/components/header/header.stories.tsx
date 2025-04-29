import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import Header from './header'
import { useUserStore } from '@/stores/userStore'

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
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
}

export const LoggedIn: Story = {
  render: () => {
    mockLoginState(true)
    return <Header />
  },
}
