import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICardHome } from '../components/parts/CardHome/CardHome';

export interface ICardsListState {
  cardsList: ICardHome[];
}

const initialState: ICardsListState = {
  cardsList: [],
};

const cardsListSlice = createSlice({
  name: 'cardsList',
  initialState,
  reducers: {
    setCardsList(state, action: PayloadAction<ICardHome[]>) {
      state.cardsList = action.payload;
    },
  },
});

export const { setCardsList } = cardsListSlice.actions;
export default cardsListSlice.reducer;
