/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

import { useGetPostsQuery, selectPostIds } from '../store/slices/posts.slice'
import Loader from '../components/Loader'
import PostsExcerpt from '../components/PostsExcerpt'
import AddPost from './AddPost'

export default function PostList() {
  const { isLoading, isSuccess, isError, error } = useGetPostsQuery({})
  const orderedPostIds = useSelector(selectPostIds)

  const err = (err: any) => toast.error(err)

  let content
  
  if (isLoading) {
    content = <Loader />
  } else if (isSuccess) {
    content = orderedPostIds.map(postId =>         
      <PostsExcerpt key={postId} postId={postId}/>
    )
  } else if (isError) {
    err(error)
  }

  return (
    <>
      <AddPost />
      {content}
    </>
  )
}
