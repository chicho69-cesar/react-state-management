/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import axios from 'axios'
import { sub } from 'date-fns'
import type { Post } from '../../types/post'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

interface State {
  posts: Post[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: State = {
  posts: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(POSTS_URL)
  return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
  const response = await axios.post(POSTS_URL, initialPost)
  return response.data
})

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
  const { id } = initialPost as any

  try {
    const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
    return response.data
  } catch (err: any) {
    return err.message
  }
})

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
  const { id } = initialPost as any

  try {
    const response = await axios.delete(`${POSTS_URL}/${id}`)
    if (response?.status === 200) return initialPost

    return `${response?.status}: ${response?.statusText}`
  } catch (err: any) {
    return err.message
  }
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              like: 0,
              unlike: 0
            }
          }
        } as any
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find(post => post.id === postId)

      if (existingPost) {
        if (reaction === 'like') existingPost.reactions!.like++
        if (reaction === 'unlike') existingPost.reactions!.unlike++
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        let min = 1

        const loadedPosts = action.payload.map((post: any) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString()
          post.reactions = {
            like: 0,
            unlike: 0
          }
          return post
        })

        state.posts = state.posts.concat(loadedPosts)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message!
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        const sortedPosts = state.posts.sort((a, b) => {
          if (a.id > b.id) return 1
          if (a.id < b.id) return -1
          return 0
        })

        action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1
        action.payload.userId = Number(action.payload.userId)
        action.payload.date = new Date().toISOString()
        action.payload.reactions = {
          like: 0,
          unlike: 0
        }

        console.log(action.payload)
        state.posts.push(action.payload)
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('Update could not complete')
          console.log(action.payload)
          return
        }

        const { id } = action.payload
        action.payload.date = new Date().toISOString()

        const posts = state.posts.filter((post) => post.id !== id)
        state.posts = [...posts, action.payload]
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('Delete could not complete')
          console.log(action.payload)
          return
        }

        const { id } = action.payload
        const posts = state.posts.filter(post => post.id !== id)

        state.posts = posts
      })
  }
})

export const selectAllPosts = (state: any) => state.posts.posts
export const getPostsStatus = (state: any) => state.posts.status
export const getPostsError = (state: any) => state.posts.error

export const selectPostById = (state: any, postId: any) => state.posts.posts.find((post: any) => post.id === postId)

export const { postAdded, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
