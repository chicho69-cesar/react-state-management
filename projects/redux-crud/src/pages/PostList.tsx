/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from '../store/slices/posts.slice'
import { Post } from '../types/post'
import PostsExcerpt from '../components/PostsExcerpt'

export default function PostList() {
  const dispatch = useDispatch()

  const posts = useSelector(selectAllPosts)
  const postStatus = useSelector(getPostsStatus)
  const error = useSelector(getPostsError)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts() as any)
    }
  }, [postStatus, dispatch])

  let content

  if (postStatus === 'loading') {
    content = <p>"Loading..."</p>
  } else if (postStatus === 'succeeded') {
    const orderedPosts = posts.slice().sort((a: any, b: any) => b.date.localeCompare(a.date))
    content = orderedPosts.map((post: Post) => <PostsExcerpt key={post.id} post={post} />)
  } else if (postStatus === 'failed') {
    content = <p>{error}</p>
  }

  return (
    <div>
      {content}
    </div>
  )
}
