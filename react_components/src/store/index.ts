import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import cardsListReducer from './cardsListSlice';

const store = configureStore({
  reducer: {
    search: searchReducer,
    cardsList: cardsListReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
