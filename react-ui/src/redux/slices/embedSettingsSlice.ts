import { createSlice } from '@reduxjs/toolkit';
import { LayoutOptions, LAYOUT_OPTIONS, THEMES } from '../../constants';
import { DEFAULT_LANGUAGE } from '../../translations/TranslationProvider';

export interface EmbedSettingsState {
  embedTitle: string;
  embedDesc: string;
  theme: string;
  listView: LayoutOptions;
  viewNum: number | null;
  searchCriteria: boolean | null;
  languageSelection: string;
  linkContainer: string;
  linkText: string;
  openInNewWindow: boolean;
  showPastEvents: boolean;
}

export const initialState: EmbedSettingsState = {
  embedTitle: '',
  embedDesc: '',
  theme: THEMES.WHITELABEL,
  listView: LAYOUT_OPTIONS.LIST,
  viewNum: null,
  searchCriteria: false,
  languageSelection: DEFAULT_LANGUAGE,
  linkContainer: '',
  linkText: '',
  openInNewWindow: true,
  showPastEvents: false,
};

export const embedSettingsSlice = createSlice({
  name: 'embedSettings',
  initialState,
  reducers: {
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
    setOpenInNewWindow: (state, action) => {
      state.openInNewWindow = action.payload;
    },
    setShowPastEvents: (state, action) => {
      state.showPastEvents = action.payload;
    },
  },
});

export default embedSettingsSlice;
