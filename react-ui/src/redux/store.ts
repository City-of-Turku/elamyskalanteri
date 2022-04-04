import { configureStore } from "@reduxjs/toolkit";
import { eventApi } from "./services/eventApi";
import { hobbyApi } from "./services/hobbyApi";
import eventReducer from "./slices/eventSlice";
import filterSlice from "./slices/filterSlice";
import hobbyReducer from "./slices/hobbySlice";
import {keywordApi} from "./services/keywordApi";

export const store = configureStore({
  reducer: {
    [eventApi.reducerPath]: eventApi.reducer,
    [hobbyApi.reducerPath]: hobbyApi.reducer,
    [keywordApi.reducerPath]: keywordApi.reducer,
    events: eventReducer.reducer,
    hobbies: hobbyReducer,
    filters: filterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(eventApi.middleware, hobbyApi.middleware, keywordApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
