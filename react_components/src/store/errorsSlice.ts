import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IErrorsState {
  errors: string[];
}

const initialState: IErrorsState = {
  errors: [],
};

const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setErrors(state, action: PayloadAction<string[]>) {
      state.errors = action.payload;
    },
    delErrors(state) {
      state.errors = [];
    },
  },
});

export const { setErrors, delErrors } = errorsSlice.actions;
export default errorsSlice.reducer;
