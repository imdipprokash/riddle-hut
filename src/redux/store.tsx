// src/redux/store.ts
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import coinReducer from './slices/coinSlice';
import levelReducer from './slices/levelSlice';

// Combine reducers if you have multiple slices
const rootReducer = combineReducers({
  coin: coinReducer,
  level: levelReducer,
});

// Persist config
const persistConfig = {
  key: 'root', // key to be used to store persisted data in storage
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (
    getDefaultMiddleware: (arg0: {serializableCheck: boolean}) => any,
  ) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed for redux-persist
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
