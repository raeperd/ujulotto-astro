import { useEffect, useState } from 'react'
import { reactClient } from '../lib/trpc/client'
import TRPCProvider from './TRPCProvider'

export default function UsernameChangeForm() {
  return (
    <TRPCProvider>
      <UsernameChangeFormInner />
    </TRPCProvider>
  )
}

function UsernameChangeFormInner() {
  const [username, setUsername] = useState('')

  const { data, isLoading } = reactClient.getCurrentUser.useQuery()
  const { mutate } = reactClient.setUsername.useMutation()

  useEffect(() => {
    if (data) {
      setUsername(data.name ?? '')
    }
  }, [isLoading])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate({ username: username })
    alert('변경되었습니다.')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2.5"
    >
      <input
        className="bg-[#242429] flex-auto rounded-[10px] px-4 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        type="submit"
        className="bg-[#242429] rounded-[10px] px-4 py-3"
      >
        수정
      </button>
    </form>
  )
}
