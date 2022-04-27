import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as dayjs from 'dayjs'


interface filterState {
  eventTypes: string[],
  search: string,
  eventFeatures: string[],
  audiences: string[],
  bbox: {
    west: number | null,
    south: number | null,
    east: number | null,
    north: number | null
  },
  startTime: Date | null,
  endTime: Date | null,
}

const initialState = {
  eventTypes: [],
  eventFeatures: [],
  audiences: [],
  search: "",
  bbox: {north: null, east: null, south: null, west: null},
  startTime: null,
  endTime: null,

} as filterState

export const filterSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEventTypes: (state, action) => {
      state.eventTypes = action.payload
    },
    setSearch: (state, action) => {
      state.search = action.payload
    },
    addFeature: (state, action) => {
      state.eventFeatures = [...state.eventFeatures, action.payload]
    },
    removeFeature: (state, action) => {
      state.eventFeatures = state.eventFeatures.filter(item => item !== action.payload)
    },
    setFeatures: (state, action) => {
      state.eventFeatures = action.payload
    },
    setBbox: (state, action) => {
      state.bbox = action.payload
    },
    setStartTime: (state, action) => {
      state.startTime = action.payload
    },
    setEndTime: (state, action) => {
      state.endTime = action.payload
    },
    addAudience: (state, action) => {
      state.audiences = state.audiences.concat(action.payload)
    },
    removeAudience: (state, action) => {
      state.audiences = state.audiences.filter((item) => item !== action.payload)
    }
  }
})

export default filterSlice