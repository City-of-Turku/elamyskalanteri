import { configureStore } from '@reduxjs/toolkit';
import { eventApi } from './services/eventApi';
import { keywordApi } from './services/keywordApi';
import { localitiesApi } from './services/localityApi';
import { organizationApi } from './services/organizationApi';
import appStateReducer from './slices/appStateSlice';
import embedSettingsSlice from './slices/embedSettingsSlice';
import filterSlice from './slices/filterSlice';
import optionsSlice from './slices/optionsSlice';

export const store = () =>
  configureStore({
    reducer: {
      [eventApi.reducerPath]: eventApi.reducer,
      [keywordApi.reducerPath]: keywordApi.reducer,
      [organizationApi.reducerPath]: organizationApi.reducer,
      [localitiesApi.reducerPath]: localitiesApi.reducer,
      appState: appStateReducer.reducer,
      filters: filterSlice.reducer,
      options: optionsSlice.reducer,
      embedSettings: embedSettingsSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        eventApi.middleware,
        keywordApi.middleware,
        organizationApi.middleware,
        localitiesApi.middleware,
      ),
  });

const state = store().getState;
const dispatch = store().dispatch;

export type RootState = ReturnType<typeof state>;
export type AppDispatch = typeof dispatch;

export default store;
