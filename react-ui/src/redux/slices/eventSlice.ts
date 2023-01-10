import { createSlice } from "@reduxjs/toolkit";
// import { GetEventResponse } from "../types/Event";

const initialState = {
  eventID: "",
}

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEventID: (state, action) => {
      state.eventID = action.payload
    }
  }
});

export const { setEventID } = eventSlice.actions;
export default eventSlice
