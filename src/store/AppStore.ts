import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Generos, Peso, Distancia } from 'src/types/types';

export interface RutinaState {
  idUsuario?: string;
  hasLogged: boolean;
  hasEnteredUserInfo: boolean;
  genero: Generos;
  peso: Peso;
  distancia: Distancia;
  nacimiento: Date;
  objetivoCalorias: number;
  objetivoSueño: number;
  objetivoAgua: number;
  setGenero: (genero: Generos) => void;
  setPeso: (peso: Peso) => void;
  setDistancia: (distancia: Distancia) => void;
  setNacimiento: (nacimiento: Date) => void;
  setObjetivoCalorias: (objetivoCalorias: number) => void;
  setObjetivoSueño: (objetivoSueño: number) => void;
  setObjetivoAgua: (objetivoAgua: number) => void;
  setHasEnteredUserInfo: (hasEnteredUserInfo: boolean) => void;
}

export const appStore = create<RutinaState>()(
  persist(
    (set) => ({
      idUsuario: undefined,
      hasLogged: false,
      hasEnteredUserInfo: false,
      genero: Generos.Masculino,
      peso: Peso.Kilgramos,
      distancia: Distancia.Kilometros,
      nacimiento: new Date(),
      objetivoCalorias: 2200,
      objetivoSueño: 8,
      objetivoAgua: 3.3,
      setGenero: (genero) => set((state) => ({ ...state, genero })),
      setPeso: (peso) => set((state) => ({ ...state, peso })),
      setDistancia: (distancia) => set((state) => ({ ...state, distancia })),
      setNacimiento: (nacimiento) => set((state) => ({ ...state, nacimiento })),
      setObjetivoCalorias: (objetivoCalorias) => set((state) => ({ ...state, objetivoCalorias })),
      setObjetivoSueño: (objetivoSueño) => set((state) => ({ ...state, objetivoSueño })),
      setObjetivoAgua: (objetivoAgua) => set((state) => ({ ...state, objetivoAgua })),
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
