import {createSlice} from '@reduxjs/toolkit';

interface AuthState {
  currentCoin: number;
}

const initialState: AuthState = {
  currentCoin: 0,
};

const coinSlice = createSlice({
  name: 'coin',
  initialState,
  reducers: {
    IncreaseCoin: state => {
      state.currentCoin += 50;
    },
    DecreaseCoin: state => {
      state.currentCoin -= 100;
    },
  },
});

export const {IncreaseCoin, DecreaseCoin} = coinSlice.actions;
export default coinSlice.reducer;
