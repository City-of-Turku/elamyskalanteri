import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Hobby } from "../types/Hobby";

const initialState: Hobby[] = [];

const hobbySlice = createSlice({
  name: "hobbies",
  initialState,
  reducers: {
    receieveHobbies(state, action: PayloadAction<Hobby>) {
      state.push(action.payload);
    },
  },
});

export default hobbySlice.reducer;
