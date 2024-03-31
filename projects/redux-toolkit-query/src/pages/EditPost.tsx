/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import toast from 'react-hot-toast'
import { AiFillPlusSquare } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectPostById, useUpdatePostMutation } from '../store/slices/posts.slice'

export default function EditPost() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const [updatePost, { isLoading }] = useUpdatePostMutation()
  const post = useSelector((state) => selectPostById(state, Number(postId)))
  const [body, setBody] = useState(post?.body)

  const success = () => toast.success('Post updated!')
  const error = (err: any) => toast.error(err)

  const canSave = Boolean(body) && !isLoading

  const onSavePost = async () => {
    if (canSave) {
      try {
        await updatePost({ id: post.id, body }).unwrap()
        setBody('')
        navigate('/')
        success()
      } catch (err: any) {
        error(err.error)
      }
    }
  }

  if (!post) {
    return (
      <div>
        <p className='font-mono text-rojo'>No post here!</p>
      </div>
    )
  }

  return (
    <form className='flex justify-center'>
      <input value={body} className='rounded-lg p-1.5 m-5 outline-none' onChange={(e) => setBody(e.target.value)} placeholder='Update Post'/>
      <button type='button' className='text-white' onClick={onSavePost}><AiFillPlusSquare size={30}/></button>
    </form>
  )
}
