/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiFillDelete, AiFillEdit, AiFillEye } from 'react-icons/ai'
import toast from 'react-hot-toast'
import { useDeletePostMutation, selectPostById } from '../store/slices/posts.slice'

interface Props {
  postId: string
}

export default function PostsExcerpt({ postId }: Props) {
  const post = useSelector((state) => selectPostById(state, postId))
  const [deletePost] = useDeletePostMutation()

  const success = () => toast.success('Post deleted!')
  const error = (err: any) => toast.error(err)

  const onDeletePost = async () => {
    try {
      await deletePost({ id:post.id }).unwrap() 
      success()
    } catch (err: any) {
      error(err.error)
    } 
  }

  return (
    <>
      <div className='bg-azul p-4 m-4  rounded-md'>
        <header className='flex justify-between'>
          <p className='m-2 text-white'>{post.body}</p>
        </header>

        <div className='flex justify-center'>
          <Link className='text-white m-3' to={`/post/${post.id}`}>
            <AiFillEye size={30} />
          </Link>

          <Link className='text-claro m-3' to={`/post/edit/${post.id}`}>
            <AiFillEdit size={30} />
          </Link>
          
          <button onClick={onDeletePost} className='text-rojo mb-4 m-3' type='button'>
            <AiFillDelete size={30} />
          </button>
        </div>
      </div>
    </>
  )
}
