/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import type { User } from '../../types/user'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

const initialState: User[] = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(USERS_URL)
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (_, action) => {
      return action.payload
    })
  }
})

export const selectAllUsers = (state: any) => state.users

export default usersSlice.reducer
