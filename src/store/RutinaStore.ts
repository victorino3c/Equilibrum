import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  RutinaType,
  SerieCalisteniaType,
  SerieCardioType,
  SerieFuerzaType,
} from '~/src/types/types';

import { Database } from '~/src/database.types';

export interface RutinaState {
  rutinas: RutinaType[];
  tituloNuevaRutina: string;

  setTituloNuevaRutina: (titulo: string) => void;

  addRutina: (rutina: RutinaType) => void;
  getRutina: (nombre: string) => RutinaType | undefined;
  removeRutina: (nombre: string) => void;
  updateRutina: (idRutina: string, rutina: RutinaType) => void;
  addEjercicioToRutina: (
    rutina: string,
    ejercicio: Database['public']['Tables']['ejercicios']['Row']
  ) => void;
  removeEjercicioFromRutina: (rutina: string, ejercicio: string) => void;
  updateEjercicioFromRutina: (rutina: string, ejercicio: string) => void;
  addSerieEjercicioRutina: (
    rutina: string,
    idEjercicio: string,
    serie: SerieCardioType | SerieCalisteniaType | SerieFuerzaType
  ) => void;
  //removeSerieFromRutina: (rutina: string, serie: number) => void;
  getSeriesByEjercicioAndRutina: (
    rutina: string,
    ejercicio: string
  ) => SerieCardioType[] | SerieCalisteniaType[] | SerieFuerzaType[];
  updateSerieCalisteniaRutinaRepeticiones: (
    rutina: string,
    idSerie: string,
    repeticiones: number
  ) => void;
  updateSerieFuerzaRutinaRepeticiones: (
    rutina: string,
    idSerie: string,
    repeticiones: number
  ) => void;
  updateSerieFuerzaRutinaPeso: (rutina: string, idSerie: string, peso: number) => void;
  updateSerieCardioRutinaCalorias: (rutina: string, idSerie: string, calorias: number) => void;
  updateSerieCardioRutinaTiempo: (rutina: string, idSerie: string, tiempo: string) => void;
  updateSerieCardioRutinaDistancia: (rutina: string, idSerie: string, distancia: number) => void;
  //updateCheckSerieRutina: (rutina: string, idEjercicio: number, idSerie: number) => void;
}

export const rutinaStore = create<RutinaState>()(
  persist(
    (set) => ({
      rutinas: [],
      tituloNuevaRutina: '',
      setTituloNuevaRutina: (titulo: string) => set({ tituloNuevaRutina: titulo }),
      addRutina: (rutina: RutinaType) => {
        // Check if the rutina already exists
        if (rutinaStore.getState().rutinas.find((r) => r.Nombre === rutina.Nombre)) return;
        set((state) => ({ rutinas: [...state.rutinas, rutina] }));
      },
      getRutina: (nombre: string): RutinaType | undefined => {
        const rutina: RutinaType | undefined = rutinaStore
          .getState()
          .rutinas.find((r: RutinaType) => r.Nombre === nombre);
        return rutina;
      },
      removeRutina: (nombre: string) =>
        set((state) => ({
          rutinas: state.rutinas.filter((rutina) => rutina.Nombre !== nombre),
        })),
      updateRutina: (idRutina: string, rutina: RutinaType) => {
        if (rutinaStore.getState().rutinas.find((r) => r.Nombre === rutina.Nombre)) return;
        set((state) => ({
          rutinas: state.rutinas.map((r) => (r.Nombre === idRutina ? rutina : r)),
        }));
      },
      addEjercicioToRutina: (
        rutina: string,
        ejercicio: Database['public']['Tables']['ejercicios']['Row']
      ) => {
        const rutinaObj = rutinaStore.getState().rutinas.find((r) => r.Nombre === rutina);
        if (!rutinaObj) return;

        rutinaObj.Ejercicios.push(ejercicio);
        set((state) => ({
          rutinas: state.rutinas.map((r) => (r.Nombre === rutina ? rutinaObj : r)),
        }));
      },
      removeEjercicioFromRutina: (rutina: string, ejercicio: string) => {
        const rutinaObj = rutinaStore.getState().rutinas.find((r) => r.Nombre === rutina);
        if (!rutinaObj) return;

        rutinaObj.Ejercicios = rutinaObj.Ejercicios.filter((e) => e.id !== ejercicio);
        set((state) => ({
          rutinas: state.rutinas.map((r) => (r.Nombre === rutina ? rutinaObj : r)),
        }));
      },
      updateEjercicioFromRutina: (rutina: string, ejercicio: string) => {
        const rutinaObj = rutinaStore.getState().rutinas.find((r) => r.Nombre === rutina);
        if (!rutinaObj) return;

        const index = rutinaObj.Ejercicios.findIndex((e) => e.id === ejercicio);
        if (index === -1) return;

        //Update the exercise
        // rutinaObj.Ejercicios[index] = updatedExercise;
        set((state) => ({
          rutinas: state.rutinas.map((r) => (r.Nombre === rutina ? rutinaObj : r)),
        }));
      },
      addSerieEjercicioRutina: (
        rutina: string,
        idEjercicio: string,
        serie: SerieCardioType | SerieCalisteniaType | SerieFuerzaType
      ) => {
        const rutinaObj = rutinaStore.getState().rutinas.find((r) => r.Nombre === rutina);
        if (!rutinaObj) return;

        //Get type of exercise
        const ejercicio = rutinaObj.Ejercicios.find((e) => e.id === idEjercicio);

        if (!ejercicio) return;

        if (ejercicio.tipo_ejercicio === 'cardio') {
          rutinaObj.SeriesCardio.push(serie as SerieCardioType);
        } else if (ejercicio.tipo_ejercicio === 'fuerza') {
          rutinaObj.SeriesFuerza.push(serie as SerieFuerzaType);
        } else if (ejercicio.tipo_ejercicio === 'calistenia') {
          rutinaObj.SeriesCalistenia.push(serie as SerieCalisteniaType);
        }

        set((state) => ({
          rutinas: state.rutinas.map((r) => (r.Nombre === rutina ? rutinaObj : r)),
        }));
      },
      getSeriesByEjercicioAndRutina: (
        rutina: string,
        ejercicio: string
      ): SerieCardioType[] | SerieCalisteniaType[] | SerieFuerzaType[] => {
        const rutinaObj = rutinaStore.getState().rutinas.find((r) => r.Nombre === rutina);
        if (!rutinaObj) return [];

        const ejercicioObj = rutinaObj.Ejercicios.find((e) => e.id === ejercicio);
        if (!ejercicioObj) return [];

        if (ejercicioObj.tipo_ejercicio === 'cardio') {
          return rutinaObj.SeriesCardio.filter((s) => s.idEjercicio === ejercicio);
        } else if (ejercicioObj.tipo_ejercicio === 'fuerza') {
          return rutinaObj.SeriesFuerza.filter((s) => s.idEjercicio === ejercicio);
        } else if (ejercicioObj.tipo_ejercicio === 'calistenia') {
          return rutinaObj.SeriesCalistenia.filter((s) => s.idEjercicio === ejercicio);
        }

        return [];
      },
      updateSerieCalisteniaRutinaRepeticiones: (
        rutina: string,
        idSerie: string,
        repeticiones: number
      ) => {
        const rutinaObj = rutinaStore.getState().rutinas.find((r) => r.Nombre === rutina);
        if (!rutinaObj) return;

        const serie = rutinaObj.SeriesCalistenia.find((s) => s.id === idSerie);
        if (!serie) return;

        serie.Repeticiones = repeticiones;

        set((state) => ({
          rutinas: state.rutinas.map((r) => (r.Nombre === rutina ? rutinaObj : r)),
        }));
      },
      updateSerieFuerzaRutinaRepeticiones: (
        rutina: string,
        idSerie: string,
        repeticiones: number
      ) => {
        const rutinaObj = rutinaStore.getState().rutinas.find((r) => r.Nombre === rutina);
        if (!rutinaObj) return;

        const serie = rutinaObj.SeriesFuerza.find((s) => s.id === idSerie);
        if (!serie) return;

        serie.Repeticiones = repeticiones;

        set((state) => ({
          rutinas: state.rutinas.map((r) => (r.Nombre === rutina ? rutinaObj : r)),
        }));
      },
      updateSerieFuerzaRutinaPeso: (rutina: string, idSerie: string, peso: number) => {
        const rutinaObj = rutinaStore.getState().rutinas.find((r) => r.Nombre === rutina);
        if (!rutinaObj) return;

        const serie = rutinaObj.SeriesFuerza.find((s) => s.id === idSerie);
        if (!serie) return;

        serie.Peso = peso;

        set((state) => ({
          rutinas: state.rutinas.map((r) => (r.Nombre === rutina ? rutinaObj : r)),
        }));
      },
      updateSerieCardioRutinaCalorias: (rutina: string, idSerie: string, calorias: number) => {
        const rutinaObj = rutinaStore.getState().rutinas.find((r) => r.Nombre === rutina);
        if (!rutinaObj) return;

        const serie = rutinaObj.SeriesCardio.find((s) => s.id === idSerie);
        if (!serie) return;

        serie.Calorias = calorias;

        set((state) => ({
          rutinas: state.rutinas.map((r) => (r.Nombre === rutina ? rutinaObj : r)),
        }));
      },
      updateSerieCardioRutinaTiempo: (rutina: string, idSerie: string, tiempo: string) => {
        const rutinaObj = rutinaStore.getState().rutinas.find((r) => r.Nombre === rutina);
        if (!rutinaObj) return;

        const serie = rutinaObj.SeriesCardio.find((s) => s.id === idSerie);
        if (!serie) return;

        serie.Tiempo = tiempo;

        set((state) => ({
          rutinas: state.rutinas.map((r) => (r.Nombre === rutina ? rutinaObj : r)),
        }));
      },
      updateSerieCardioRutinaDistancia: (rutina: string, idSerie: string, distancia: number) => {
        const rutinaObj = rutinaStore.getState().rutinas.find((r) => r.Nombre === rutina);
        if (!rutinaObj) return;

        const serie = rutinaObj.SeriesCardio.find((s) => s.id === idSerie);
        if (!serie) return;

        serie.Distancia = distancia;

        set((state) => ({
          rutinas: state.rutinas.map((r) => (r.Nombre === rutina ? rutinaObj : r)),
        }));
      },
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
      onRehydrateStorage: (state: RutinaState) => {
        if (state) {
        }
      },
    }
  )
);

export default rutinaStore;
