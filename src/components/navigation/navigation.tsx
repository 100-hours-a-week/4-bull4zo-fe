import React from 'react'
import { ClipboardPlus, Flame, User, Vote } from 'lucide-react'
import { Tab, useNavigationStore } from '@/stores/navigationStore'

interface NavigationItemProps {
  icon: React.ReactNode
  label: Tab
}

const NavigationItem = ({ icon, label }: NavigationItemProps) => {
  const tab = useNavigationStore((state) => state.tab)
  const setTab = useNavigationStore((state) => state.setTab)

  const selected = tab === label

  return (
    <button
      onClick={() => setTab(label)}
      className="flex flex-col items-center justify-center flex-1 gap-3 my-3"
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
    <nav className="flex flex-row items-center justify-around w-full h-[4rem] absolute bottom-0 left-0">
      <NavigationItem icon={<Flame />} label="home" />
      <NavigationItem icon={<ClipboardPlus />} label="make" />
      <NavigationItem icon={<Vote />} label="research" />
      <NavigationItem icon={<User />} label="my" />
    </nav>
  )
}
export default Navigation
