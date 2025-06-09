import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ListCheckIcon, Plus, User } from 'lucide-react'
import Vote from '@/assets/vote.svg?react'
import { useModalStore } from '@/stores/modalStore'
import { Tab, useNavigationStore } from '@/stores/navigationStore'
import { useUserStore } from '@/stores/userStore'
import { Icon } from '../Icon/icon'
import { LoginRequiredCard } from '../modal/loginRequiredModal'

interface NavigationItemProps {
  icon: React.ReactNode
  label: Tab
}

const NavigationItem = ({ icon, label }: NavigationItemProps) => {
  const tab = useNavigationStore((state) => state.tab)
  const navigation = useNavigate()

  const { isLogin } = useUserStore()
  const { openModal } = useModalStore()

  const selected = tab === label

  const onClick = () => {
    if (!isLogin) {
      openModal(<LoginRequiredCard />)
    } else {
      navigation(`/${label}`)
    }
  }

  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex flex-col items-center cursor-pointer justify-center flex-1 gap-2 my-3"
    >
      <div className="relative flex items-center justify-center">
        <div
          className={`absolute transition-all duration-500 rounded-[2rem] w-full h-full ${
            selected ? 'opacity-100 scale-100 bg-gray-200' : 'opacity-0 scale-90'
          }`}
        />
        <div className="relative z-10 px-5 py-1">{icon}</div>
      </div>
      <div
        className={`h-1 rounded-full transition-all duration-500 ${
          selected ? 'w-12 bg-black' : 'w-4 bg-gray-400'
        }`}
      />
    </button>
  )
}

const Navigation = () => {
  return (
    <nav className="flex z-50 flex-row items-center justify-around max-w-[450px] w-full h-[4rem] fixed bottom-0 bg-white">
      <NavigationItem icon={<Icon component={Vote} />} label="home" />
      <NavigationItem icon={<Plus />} label="make" />
      <NavigationItem icon={<ListCheckIcon />} label="research" />
      <NavigationItem icon={<User />} label="user" />
    </nav>
  )
}
export default Navigation
