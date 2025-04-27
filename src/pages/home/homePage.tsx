import { useQuery } from '@tanstack/react-query'

interface User {
  id: number
  name: string
}

async function fetchUsers(): Promise<User[]> {
  const res = await fetch('/api/v1/users')
  if (!res.ok) {
    throw new Error('Failed to fetch users')
  }
  return res.json()
}

export default function HomePage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  if (isLoading) return <div>로딩 중...</div>
  if (error) return <div>에러 발생!</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User 목록</h1>
      <ul className="list-disc pl-6">
        {data?.map((user) => (
          <li key={user.id}>
            {user.id} - {user.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
