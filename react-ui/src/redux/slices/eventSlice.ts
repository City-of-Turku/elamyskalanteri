import { createSlice } from "@reduxjs/toolkit";
import { GetEventResponse } from "../types/Event";

const initialState: GetEventResponse[] = [];

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    events: (state, action) => {
      state.push = action.payload;
    },
  },
});

export const { events } = eventSlice.actions;
export default eventSlice.reducer;
