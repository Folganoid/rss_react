import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISearchState {
  name: string;
  page: number;
}

const initialState: ISearchState = {
  name: '',
  page: 1,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const { setName, setPage } = searchSlice.actions;
export default searchSlice.reducer;
