// src/redux/slices/exampleSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  isLogIn: boolean;
}

const initialState: AuthState = {
  isLogIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SetLOGIN: state => {
      state.isLogIn = true;
    },
    SetLOGOUT: state => {
      state.isLogIn = false;
    },
  },
});

export const {SetLOGIN, SetLOGOUT} = authSlice.actions;
export default authSlice.reducer;
