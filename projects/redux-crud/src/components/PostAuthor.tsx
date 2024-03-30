/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../store/slices/users.slice'

interface Props {
  userId: number | string
}

export default function PostAuthor({ userId }: Props) {
  const users = useSelector(selectAllUsers)
  const author = users.find((user: any) => user.id === userId)

  return (
    <span> by { author ? author.name : 'Unknown author' } </span>
  )
}
