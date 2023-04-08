import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ILoaderState {
  isLoading: boolean;
}

const initialState: ILoaderState = {
  isLoading: false,
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading } = loaderSlice.actions;
export default loaderSlice.reducer;
