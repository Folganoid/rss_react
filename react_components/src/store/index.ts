import errorsSlice from './errorsSlice';
import formSlice from './formSlice';
import loaderSlice from './loaderSlice';
import searchReducer from './searchSlice';
import { cardApi, cardsApi } from '../services/CardsService';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    search: searchReducer,
    loader: loaderSlice,
    errors: errorsSlice,
    form: formSlice,
    [cardApi.reducerPath]: cardApi.reducer,
    [cardsApi.reducerPath]: cardsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cardApi.middleware).concat(cardsApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
