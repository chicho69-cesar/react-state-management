import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  count: 0
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    sum: (state) => {
      state.count += 1
    },
    sub: (state) => {
      state.count -= 1
    },
    reset: (state) => {
      state.count = 0
    },
    increaseByNumber: (state, action) => {
      state.count += action.payload
    }
  }
})

export const { sum, sub, reset, increaseByNumber } = counterSlice.actions
export default counterSlice.reducer
