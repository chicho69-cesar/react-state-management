/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { addNewPost } from '../store/slices/posts.slice'
import { selectAllUsers } from '../store/slices/users.slice'
import { User } from '../types/user'

export default function AddPost() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const onTitleChange = (e: React.FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
  const onContentChange = (e: React.FormEvent<HTMLInputElement>) => setContent(e.currentTarget.value)
  const onUserIdChange = (e: React.FormEvent<HTMLSelectElement>) => setUserId(e.currentTarget.value)

  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

  const onSavePost = () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')

        dispatch(
          addNewPost({ title, body: content, userId }) as any
        ).unwrap()

        setTitle('')
        setContent('')
        setUserId('')

        navigate('/')
      } catch (err) {
        console.error('Failed', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }
  
  const users = useSelector(selectAllUsers)

  const userOptions = users.map((user: User) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <form>
      <select value={userId} onChange={onUserIdChange}>
        <option value=''></option>
        {userOptions}
      </select>
      
      <input
        value={title}
        onChange={onTitleChange}
        placeholder='Title'
      />

      <input
        value={content}
        onChange={onContentChange}
        placeholder='Content'
      />

      <button onClick={onSavePost} type='button'>
        POST
      </button>
    </form>
  )
}
