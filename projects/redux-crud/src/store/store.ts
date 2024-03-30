import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './slices/posts.slice'
import usersReducer from './slices/users.slice'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  }
})
