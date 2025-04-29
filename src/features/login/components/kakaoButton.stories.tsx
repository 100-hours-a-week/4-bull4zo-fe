import { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import KakaoButton from './kakaoButton'
import { useUserStore } from '@/stores/userStore'

const meta: Meta<typeof KakaoButton> = {
  title: 'Components/KakaoButton',
  component: KakaoButton,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="p-6 bg-white max-w-sm mx-auto">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof KakaoButton>

export const Default: Story = {
  render: () => {
    useUserStore.setState({ isLogin: false, accessToken: '' })
    return <KakaoButton />
  },
}
