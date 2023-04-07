import { createSlice } from '@reduxjs/toolkit';

export interface ISearchState {
  search: {
    search: string;
  };
}

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    search: localStorage.getItem('search') || '',
  },
  reducers: {
    setSearch(state, action) {
      if (action.payload.search.match(/^[a-zA-Z]*$/)) {
        state.search = action.payload.search;
      }
    },
  },
});

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;
