import { GroupDropDown } from '@/components/dropdown/groupDropDown'
import { useUserStore } from '@/stores/userStore'

const HomePage = () => {
  const isLogin = useUserStore((state) => state.isLogin)

  return <article className="">{isLogin && <GroupDropDown />}</article>
}
export default HomePage
