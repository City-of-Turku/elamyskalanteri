import { configureStore } from '@reduxjs/toolkit';
import { eventApi } from './services/eventApi';
import { keywordApi } from './services/keywordApi';
import { organizationApi } from './services/organizationApi';
import eventReducer from './slices/eventSlice';
import filterSlice from './slices/filterSlice';
import optionsSlice from './slices/optionsSlice';

export const store = () =>
  configureStore({
    reducer: {
      [eventApi.reducerPath]: eventApi.reducer,
      [keywordApi.reducerPath]: keywordApi.reducer,
      [organizationApi.reducerPath]: organizationApi.reducer,
      events: eventReducer.reducer,
      filters: filterSlice.reducer,
      options: optionsSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        eventApi.middleware,
        keywordApi.middleware,
        organizationApi.middleware,
      ),
  });

const state = store().getState;
const dispatch = store().dispatch;

export type RootState = ReturnType<typeof state>;
export type AppDispatch = typeof dispatch;

export default store;
