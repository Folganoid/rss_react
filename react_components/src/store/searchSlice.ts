import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISearchState {
  search: string;
}

const initialState: ISearchState = {
  search: localStorage.getItem('search') || '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      if (action.payload.match(/^[a-zA-Z]*$/)) {
        state.search = action.payload;
      }
    },
  },
});

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;
