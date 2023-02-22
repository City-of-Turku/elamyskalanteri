import { createSlice } from '@reduxjs/toolkit';
import { LayoutOptions, LAYOUT_OPTIONS, THEMES } from '../../constants';
import { DEFAULT_LANGUAGE } from '../../translations/TranslationProvider';

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
  embedTitle: string;
  embedDesc: string;
  theme: string;
  listView: LayoutOptions;
  viewNum: number | null;
  searchCriteria: boolean | null;
  languageSelection: string;
  linkContainer: string;
  linkText: string;
  localities: string[];
  openInNewWindow: boolean;
  showPastEvents: boolean;
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
  embedTitle: '',
  embedDesc: '',
  theme: THEMES.VINK,
  listView: LAYOUT_OPTIONS.LIST,
  viewNum: null,
  searchCriteria: false,
  languageSelection: DEFAULT_LANGUAGE,
  linkContainer: '',
  linkText: '',
  localities: [],
  openInNewWindow: true,
  showPastEvents: false,
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
    setEmbedTitle: (state, action) => {
      state.embedTitle = action.payload;
    },
    setEmbedDesc: (state, action) => {
      state.embedDesc = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setListView: (state, action) => {
      state.listView = action.payload;
    },
    setNumberOfView: (state, action) => {
      state.viewNum = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setLanguageSelection: (state, action) => {
      state.languageSelection = action.payload;
    },
    setLinkContainer: (state, action) => {
      state.linkContainer = action.payload;
    },
    setLinkText: (state, action) => {
      state.linkText = action.payload;
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
    setOpenInNewWindow: (state, action) => {
      state.openInNewWindow = action.payload;
    },
    setShowPastEvents: (state, action) => {
      state.showPastEvents = action.payload;
    },
  },
});

export default filterSlice;
