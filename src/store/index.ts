import { configureStore } from '@reduxjs/toolkit';
import { currencyApi } from './currency/currency.api';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [currencyApi.reducerPath]: currencyApi.reducer,
  }
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;