import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface RutinaState {
  idUsuario?: string;
  hasLogged: boolean;
  hasEnteredUserInfo: boolean;
  setHasEnteredUserInfo: (hasEnteredUserInfo: boolean) => void;
}

export const appStore = create<RutinaState>()(
  persist(
    (set) => ({
      idUsuario: undefined,
      hasLogged: false,
      hasEnteredUserInfo: false,
      setHasEnteredUserInfo: (hasEnteredUserInfo) =>
        set((state) => ({ ...state, hasEnteredUserInfo })),
    }),
    {
      name: 'app-storage',
      storage: {
        getItem: async (key) => {
          const item = await AsyncStorage.getItem(key);
          return item ? JSON.parse(item) : null;
        },
        setItem: async (key, value) => {
          await AsyncStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: async (key) => {
          await AsyncStorage.removeItem(key);
        },
      },
      onRehydrateStorage: (state: RutinaState) => {
        if (state) {
        }
      },
    }
  )
);

export default appStore;
