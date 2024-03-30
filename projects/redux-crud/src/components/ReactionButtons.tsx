import { AiFillDislike, AiFillLike } from 'react-icons/ai'
import { useDispatch } from 'react-redux'

import { Post } from '../types/post'
import { reactionAdded } from '../store/slices/posts.slice'

const reactionEmoji = {
  like: <AiFillLike/>,
  unlike: <AiFillDislike/>
}

interface Props {
  post: Post
}

export default function ReactionButtons({ post }: Props) {
  const dispatch = useDispatch()

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button key={name} type='button' onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name }))}>
        {emoji} {name === 'like' ? post.reactions!.like : post.reactions!.unlike}
      </button>
    )
  })

  return (
    <div>
      {reactionButtons}
    </div>
  )
}
