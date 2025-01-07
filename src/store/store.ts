import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  EjercicioType,
  SerieCalisteniaType,
  SerieCardioType,
  SerieFuerzaType,
} from '~/assets/ejercicio/entrenamientos';
import moment from 'moment';

export interface EntrenamientoState {
  isRunning: boolean; // El cronómetro está en marcha
  seconds: number;
  volumen: number;
  calorias: number;
  fecha: string;
  idUsuario: string;
  ejercicios: EjercicioType[];
  seriesCardio: SerieCardioType[];
  seriesFuerza: SerieFuerzaType[];
  seriesCalistenia: SerieCalisteniaType[];
  setSeconds: (seconds: number) => void;
  setIsRunning: (isRunning: boolean) => void;
  stopTimer: () => void;
  startTimer: () => void;
  formatTime: (seconds: number) => string;
  addEjercicio: (ejercicio: EjercicioType) => void;
  removeEjercicio: (idEjercicio: number) => void;
  addSerieEjercicio: (
    serie: SerieCardioType | SerieFuerzaType | SerieCalisteniaType,
    idEjercicio: number
  ) => void;
  removeSerieEjercicio: (idSerie: number) => void;
  calcularVolumen: () => void;
  calcularCalorias: () => void;
  resetEntrenamiento: () => void;
  setFecha: (fecha: string) => void;
}

export const useStore = create<EntrenamientoState>()(
  persist(
    (set) => ({
      isRunning: false,
      seconds: 0,
      volumen: 0,
      calorias: 0,
      fecha: moment().format('YYYY-MM-DD'),
      idUsuario: '',
      ejercicios: [],
      seriesCardio: [],
      seriesFuerza: [],
      seriesCalistenia: [],
      setSeconds: (seconds: number) => set({ seconds }),
      setIsRunning: (isRunning: boolean) => set({ isRunning }),
      stopTimer: () => set({ isRunning: false }),
      startTimer: () => set(() => ({ isRunning: true })),
      formatTime: (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor(seconds / 60) % 60;
        const secs = seconds % 60;
        return hours
          ? `${hours < 10 ? '0' : ''}${hours}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`
          : `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
      },
      addEjercicio: (ejercicio: EjercicioType) =>
        set((state) => ({ ejercicios: [...state.ejercicios, ejercicio] })),
      removeEjercicio: (idEjercicio: number) =>
        set((state) => ({
          ejercicios: state.ejercicios.filter((ejercicio) => ejercicio.id !== idEjercicio),
        })),
      addSerieEjercicio: (
        serie: SerieCardioType | SerieFuerzaType | SerieCalisteniaType,
        idEjercicio: number
      ) =>
        set((state) => {
          //Consigo el ejercicio con la id
          const ejercicio = state.ejercicios.find((e) => e.id == idEjercicio);

          if (!ejercicio) return state;

          if (ejercicio.tipo === 'Cardio') {
            return { seriesCardio: [...state.seriesCardio, serie as SerieCardioType] };
          } else if (ejercicio.tipo === 'Fuerza') {
            return { seriesFuerza: [...state.seriesFuerza, serie as SerieFuerzaType] };
          } else if (ejercicio.tipo === 'Calistenia') {
            return { seriesCalistenia: [...state.seriesCalistenia, serie as SerieCalisteniaType] };
          }
          return state;
        }),
      removeSerieEjercicio: (idSerie: number) =>
        set((state) => {
          const seriesCardio = state.seriesCardio.filter((serie) => serie.id !== idSerie);
          const seriesFuerza = state.seriesFuerza.filter((serie) => serie.id !== idSerie);
          const seriesCalistenia = state.seriesCalistenia.filter((serie) => serie.id !== idSerie);
          return { seriesCardio, seriesFuerza, seriesCalistenia };
        }),
      calcularVolumen: () =>
        set((state) => {
          const volumen = state.seriesFuerza.reduce(
            (acc, serie) => acc + serie.Peso * serie.Repeticiones,
            0
          );
          return { volumen };
        }),
      calcularCalorias: () =>
        set((state) => {
          let calorias = state.seriesCardio.reduce((acc, serie) => acc + serie.Calorias, 0);
          return { calorias };
        }),
      resetEntrenamiento: () =>
        set(() => ({
          isRunning: false,
          seconds: 0,
          volumen: 0,
          calorias: 0,
          fecha: moment().format('YYYY-MM-DD'),
          ejercicios: [],
          seriesCardio: [],
          seriesFuerza: [],
          seriesCalistenia: [],
        })),
      setFecha: (fecha: string) => set({ fecha }),
    }),
    {
      name: 'entrenamiento-storage',
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
      onRehydrateStorage: (state) => {
        if (state) {
          state.seconds = state.seconds || 0;
        }
      },
    }
  )
);

export default useStore;
