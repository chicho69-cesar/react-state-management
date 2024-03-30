import { Link } from 'react-router-dom'

import { Post } from '../types/post'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

interface Props {
  post: Post & { date?: string }
}

export default function PostsExcerpt({ post }: Props) {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      
      <p>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date!} />
        <Link to={`post/${post.id}`}>See more</Link>
      </p>
      
      <ReactionButtons post={post} />
    </div>
  )
}
