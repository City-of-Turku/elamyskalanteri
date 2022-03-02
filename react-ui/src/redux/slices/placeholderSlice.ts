import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface placeholderState {
  value: number
}

const initialState = {
  value: 0,
} as placeholderState

export const placeholderSlice = createSlice({
  name: "placeholder",
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }
  }
})

export default placeholderSlice