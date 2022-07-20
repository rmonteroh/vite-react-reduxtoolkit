import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number,
};

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incremented(state){
      // This is allowed because immer make immutable,
      state.value++;
    },
    addAmount(state, action: PayloadAction<number>){
      state.value += action.payload;
    }
  }
});

export const { incremented, addAmount } = counterSlice.actions;
export default counterSlice.reducer;

