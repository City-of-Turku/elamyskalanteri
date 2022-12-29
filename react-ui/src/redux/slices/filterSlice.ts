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
  typeId: string | null,
  embedTitle: string,
  embedDesc: string,
  style: string,
  listView: string,
  viewNum: number | null,
  searchCriteria: boolean | null,
  languageSelection: string,
  linkContainer: string,
  linkText: string
}

const initialState = {
  eventTypes: [],
  eventFeatures: [],
  audiences: [],
  search: "",
  bbox: { north: null, east: null, south: null, west: null },
  startTime: null,
  endTime: null,
  typeId: null,
  embedTitle: "",
  embedDesc: "",
  style: "",
  listView: "",
  viewNum: null,
  searchCriteria: true,
  languageSelection: "",
  linkContainer: "",
  linkText: ""
} as filterState

export const filterSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEventTypes: (state, action) => {
      state.eventTypes = action.payload
    },
    addEventType: (state, action) => {
      state.eventTypes = [...state.eventTypes, action.payload]
    },
    removeEventTypes: (state, action) => {
      state.eventTypes = state.eventTypes.filter(eventType => !action.payload?.includes(eventType))
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
    setAudience: (state, action) => {
      state.audiences = action.payload
    },
    addAudience: (state, action) => {
      state.audiences = state.audiences.concat(action.payload)
    },
    removeAudience: (state, action) => {
      state.audiences = state.audiences.filter((item) => item !== action.payload)
    },
    setTypeId: (state, action) => {
      state.typeId = action.payload
    },
    setEmbedTitle: (state, action) => {
      state.embedTitle = action.payload
    },
    setEmbedDesc: (state, action) => {
      state.embedDesc = action.payload
    },
    setStyle: (state, action) => {
      state.style = action.payload
    },
    setListView: (state, action) => {
      state.listView = action.payload
    },
    setNumberOfView: (state, action) => {
      state.viewNum = action.payload
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload
    },
    setLanguageSelection: (state, action) => {
      state.languageSelection = action.payload
    },
    setLinkContainer: (state, action) => {
      state.linkContainer = action.payload
    },
    setLinkText: (state, action) => {
      state.linkText = action.payload
    }
  }
})

export default filterSlice