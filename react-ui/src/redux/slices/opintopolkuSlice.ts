import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  opintopolkuID: "",
}

const opintopolkuSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setOpintopolkuID: (state, action) => {
      state.opintopolkuID = action.payload
    }
  }
});

export const { setOpintopolkuID } = opintopolkuSlice.actions;
export default opintopolkuSlice
