import {createSlice} from '@reduxjs/toolkit';

interface AuthState {
  currentLevel: number;
}

const initialState: AuthState = {
  currentLevel: 0,
};

const levelSlice = createSlice({
  name: 'level',
  initialState,
  reducers: {
    IncreaseLevel: state => {
      state.currentLevel = initialState.currentLevel + 1;
    },
    DecreaseLevel: state => {
      state.currentLevel = initialState.currentLevel - 1;
    },
    ResetLevel: state => {
      state.currentLevel = 0;
    },
  },
});

export const {IncreaseLevel, DecreaseLevel, ResetLevel} = levelSlice.actions;
export default levelSlice.reducer;
