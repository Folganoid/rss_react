import { ICard } from 'components/parts/Card/Card';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IFormState {
  cardList: ICard[];
}

const initialState: IFormState = {
  cardList: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setCardList(state, action: PayloadAction<ICard[]>) {
      state.cardList = action.payload;
    },
  },
});

export const { setCardList } = formSlice.actions;
export default formSlice.reducer;
