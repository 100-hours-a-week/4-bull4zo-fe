import { GroupDropDown } from '@/components/dropdown/groupDropDown'
import { useUserStore } from '@/stores/userStore'

const HomePage = () => {
  const isLogin = useUserStore((state) => state.isLogin)

  return <article className="px-5 py-4">{isLogin && <GroupDropDown />}</article>
}
export default HomePage
