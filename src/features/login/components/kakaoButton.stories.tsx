import { MemoryRouter } from 'react-router-dom'
import { Meta, StoryObj } from '@storybook/react'
import { useUserStore } from '@/stores/userStore'
import KakaoButton from './kakaoButton'

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
