/* eslint-disable @typescript-eslint/no-explicit-any */
import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { apiSlice } from './api.slice'
import { Post } from '../../types/post.d'

const postsAdapter = createEntityAdapter({
  sortComparer: ((a: any, b: any) => b.id - a.id)
})

const initialState = postsAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => '/blogs/',
      transformResponse: (responseData: any) => {
        const loadedPosts = responseData.map((post: Post) => {
          return post
        })

        return postsAdapter.setAll(initialState, loadedPosts)
      },
      providesTags: (result: any) => [
        { type: 'Post', id: 'LIST' },
        ...result.ids.map((id: any) => ({ type: 'Post', id }))
      ]
    }),
    addNewPost: builder.mutation({
      query: initialPost => ({
        url: '/blogs/',
        method: 'POST',
        body: { ...initialPost }
      }),
      invalidatesTags: [
        { type: 'Post', id: 'LIST' }
      ]
    }),
    updatePost: builder.mutation({
      query: initialPost => ({
        url: `/blogs/${initialPost.id}/`,
        method: 'PUT',
        body: { ...initialPost }
      }),
      invalidatesTags: (_, __, arg) => [
        { type: 'Post', id: arg.id }
      ]
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/blogs/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, arg) => [
        { type: 'Post', id: arg.id }
      ]
    })
  })
})

export const {
  useDeletePostMutation,
  useUpdatePostMutation,
  useAddNewPostMutation,
  useGetPostsQuery
} = extendedApiSlice

export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select({})

const selectPostsData = createSelector(
  selectPostsResult,
  postsResult => postsResult.data
)

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
} = postsAdapter.getSelectors((state: any) => selectPostsData(state) ?? initialState)
