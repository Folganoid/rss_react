import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import cardsListReducer from './cardsListSlice';
import loaderSlice from './loaderSlice';
import errorsSlice from './errorsSlice';
import formSlice from './formSlice';
import { cardApi, cardsApi } from '../services/CardsService';

const store = configureStore({
  reducer: {
    search: searchReducer,
    cardsList: cardsListReducer,
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
