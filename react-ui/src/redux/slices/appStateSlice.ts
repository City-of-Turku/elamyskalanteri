import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  attributesLoaded: false,
};

const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setAttributesLoaded: (state, action) => {
      state.attributesLoaded = action.payload;
    },
  },
});

export const { setAttributesLoaded } = appStateSlice.actions;
export default appStateSlice;
