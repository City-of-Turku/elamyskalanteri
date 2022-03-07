import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface filterState {
  eventTypes: any,
  name: string,
}

const initialState = {
  eventTypes: [],
  name: "",
} as filterState

export const filterSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEventTypes: (state, action) => {
      state.eventTypes = action.payload
    },
    setName: (state, action) => {
      state.name = action.payload
    }
  }
})

export default filterSlice