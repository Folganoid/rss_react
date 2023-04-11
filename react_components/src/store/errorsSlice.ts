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
    addError(state, action: PayloadAction<string>) {
      state.errors.push(action.payload);
    },
    delError(state) {
      state.errors.shift();
    },
  },
});

export const { addError, delError } = errorsSlice.actions;
export default errorsSlice.reducer;
