import { createSlice } from '@reduxjs/toolkit';

export interface FilterState {
  eventTypes: string[];
  search: string;
  eventFeatures: string[];
  audiences: string[];
  maxDistance: {
    latitude: number | null;
    longitude: number | null;
    radius: number | null;
  };
  startTime: Date | null;
  endTime: Date | null;
  typeId: string | null;
  localities: string[];
}

export const initialState: FilterState = {
  eventTypes: [],
  eventFeatures: [],
  audiences: [],
  search: '',
  maxDistance: {
    latitude: null,
    longitude: null,
    radius: null,
  },
  startTime: null,
  endTime: null,
  typeId: '',
  localities: [],
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setEventTypes: (state, action) => {
      state.eventTypes = action.payload;
    },
    addEventType: (state, action) => {
      state.eventTypes = [...state.eventTypes, action.payload];
    },
    removeEventTypes: (state, action) => {
      state.eventTypes = state.eventTypes.filter(
        (eventType) => !action.payload?.includes(eventType),
      );
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    addFeature: (state, action) => {
      state.eventFeatures = [...state.eventFeatures, action.payload];
    },
    removeFeature: (state, action) => {
      state.eventFeatures = state.eventFeatures.filter((item) => item !== action.payload);
    },
    setFeatures: (state, action) => {
      state.eventFeatures = action.payload;
    },
    setMaxDistance: (state, action) => {
      state.maxDistance = action.payload;
    },
    setStartTime: (state, action) => {
      state.startTime = action.payload;
    },
    setEndTime: (state, action) => {
      state.endTime = action.payload;
    },
    setAudience: (state, action) => {
      state.audiences = action.payload;
    },
    addAudience: (state, action) => {
      state.audiences = state.audiences.concat(action.payload);
    },
    removeAudience: (state, action) => {
      state.audiences = state.audiences.filter((item) => item !== action.payload);
    },
    setTypeId: (state, action) => {
      state.typeId = action.payload;
    },
    setLocalities: (state, action) => {
      state.localities = action.payload;
    },
    addLocalities: (state, action) => {
      state.localities = state.localities.concat(action.payload);
    },
    removeLocalities: (state, action) => {
      state.localities = state.localities.filter((item) => item !== action.payload);
    },
  },
});

export default filterSlice;
