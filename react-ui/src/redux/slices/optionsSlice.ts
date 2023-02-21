import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { LayoutOptions, LAYOUT_OPTIONS, THEMES } from '../../constants';
import { DEFAULT_LANGUAGE } from '../../translations/TranslationProvider';

export interface OptionsState {
  title: string | null;
  description: string | null;
  theme: string;
  listView: LayoutOptions;
  numOfVisibleResults: number | null;
  showSearch: boolean | null;
  languageSelection: string;
  linkContainer: string | null;
  linkText: string | null;
  showEmbedTool: boolean;
  openInNewWindow: boolean;
}

const initialState: OptionsState = {
  title: null,
  description: null,
  theme: THEMES.VINK,
  listView: LAYOUT_OPTIONS.LIST,
  numOfVisibleResults: null,
  showSearch: null,
  languageSelection: DEFAULT_LANGUAGE,
  linkContainer: null,
  linkText: null,
  showEmbedTool: false,
  openInNewWindow: false,
};

export const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string | null>) => {
      state.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string | null>) => {
      state.description = action.payload;
    },
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    setListView: (state, action: PayloadAction<LayoutOptions>) => {
      state.listView = action.payload;
    },
    setNumOfVisibleResults: (state, action: PayloadAction<number | null>) => {
      state.numOfVisibleResults = action.payload;
    },
    setShowSearch: (state, action: PayloadAction<boolean>) => {
      state.showSearch = action.payload;
    },
    setLanguageSelection: (state, action: PayloadAction<string>) => {
      state.languageSelection = action.payload;
    },
    setLinkContainer: (state, action: PayloadAction<string>) => {
      state.linkContainer = action.payload;
    },
    setLinkText: (state, action: PayloadAction<string>) => {
      state.linkText = action.payload;
    },
    setShowEmbedTool: (state, action: PayloadAction<boolean>) => {
      state.showEmbedTool = action.payload;
    },
    setOpenInNewWindow: (state, action: PayloadAction<boolean>) => {
      state.openInNewWindow = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setTitle,
  setDescription,
  setTheme,
  setListView,
  setNumOfVisibleResults,
  setShowSearch,
  setLanguageSelection,
  setLinkContainer,
  setLinkText,
  setShowEmbedTool,
  setOpenInNewWindow,
} = optionsSlice.actions;

export default optionsSlice;
