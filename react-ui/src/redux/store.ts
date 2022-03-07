import { configureStore } from "@reduxjs/toolkit";
import { eventApi } from "./services/eventApi";
import eventReducer from "./slices/eventSlice";
import filterSlice from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    [eventApi.reducerPath]: eventApi.reducer,
    events: eventReducer,
    filters: filterSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(eventApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
