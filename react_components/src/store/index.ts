import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import cardsListReducer from './cardsListSlice';
import loaderSlice from './loaderSlice';
import errorsSlice from './errorsSlice';
import formSlice from './formSlice';

const store = configureStore({
  reducer: {
    search: searchReducer,
    cardsList: cardsListReducer,
    loader: loaderSlice,
    errors: errorsSlice,
    form: formSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
