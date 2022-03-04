import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Event } from "../types/Event";

const initialState: Event[] = [];

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    receieveEvents(state, action: PayloadAction<Event>) {
      state.push(action.payload);
    },
  },
});

export default eventSlice.reducer;
