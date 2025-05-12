import { createSlice } from '@reduxjs/toolkit';

interface CounterState {
    value: number;
    maxSolved: number;
}

const initialState: CounterState = {
    value: 0,
    maxSolved: 0,
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
            state.maxSolved += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        reset: (state) => {
            state.value = 0;
        },
    },
});

export const { increment, decrement, reset } = counterSlice.actions;

export default counterSlice.reducer;
