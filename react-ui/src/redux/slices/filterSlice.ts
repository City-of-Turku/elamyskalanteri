import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface filterState {
  eventTypes: string[],
  name: string,
  eventFeatures: string[]
  bbox: {
    west: number | null,
    south: number | null,
    east: number | null,
    north: number | null
  }
}

const initialState = {
  eventTypes: [],
  eventFeatures: [],
  name: "",
  bbox: {north: null, east: null, south: null, west: null}
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
    },
    setFeatures: (state, action) => {
      state.eventFeatures = action.payload
    },
    setBbox: (state, action) => {
      state.bbox = action.payload
    }
  }
})

export default filterSlice