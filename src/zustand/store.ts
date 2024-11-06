import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {persist, PersistStorage} from 'zustand/middleware';

const asyncStorage: PersistStorage<LevelState> = {
  getItem: async name => {
    const item = await AsyncStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: async (name, value) => {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async name => {
    await AsyncStorage.removeItem(name);
  },
};

interface LevelState {
  level: number;
  increaseLevel: () => void;
  decreaseLevel: () => void;
  setLevelToZero: () => void;
}

export const useStore = create<LevelState>()(
  persist(
    set => ({
      level: 0,
      increaseLevel: () => set(state => ({level: state.level + 1})),
      decreaseLevel: () => set(state => ({level: state.level - 1})),
      setLevelToZero: () => set(state => ({level: 0})),
    }),
    {
      name: 'bear-storage', // Unique name for the local storage key
      storage: asyncStorage,
    },
  ),
);

interface CoinState {
  coin: number;
  increaseCoin: () => void;
  decreaseCoin: () => void;
}

export const useCoinStore = create<CoinState>()(
  persist(
    set => ({
      coin: 0,
      increaseCoin: () => set(state => ({coin: state.coin + 50})),
      decreaseCoin: () => set(state => ({coin: state.coin - 50})),
    }),
    {
      name: 'coin-storage', // Unique name for the local storage key
      storage: asyncStorage,
    },
  ),
);
