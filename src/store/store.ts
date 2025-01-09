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
  getSeriesCardioByEjericio: (idEjercicio: number) => SerieCardioType[] | null;
  getSeriesFuerzaByEjericio: (idEjercicio: number) => SerieFuerzaType[] | null;
  getSeriesCalisteniaByEjericio: (idEjercicio: number) => SerieCalisteniaType[] | null;
  getSeriesByEjericio: (
    idEjercicio: number
  ) => SerieCardioType[] | SerieFuerzaType[] | SerieCalisteniaType[] | null;
  updateSerieFuerzaPeso: (idSerie: number, peso: number) => void;
  updateSerieFuerzaRepeticiones: (idSerie: number, repeticiones: number) => void;
  updateSerieCardioDistancia: (idSerie: number, distancia: number) => void;
  updateSerieCardioTiempo: (idSerie: number, tiempo: string) => void;
  updateSerieCardioCalorias: (idSerie: number, calorias: number) => void;
  updateSerieCalisteniaRepeticiones: (idSerie: number, repeticiones: number) => void;
  updateCheckSerie: (idSerie: number, isCheck: boolean) => void;
}

export const appStore = create<EntrenamientoState>()(
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
      addEjercicio: (ejercicio: EjercicioType) => {
        //Si el ejercicio ya está en la lista, no lo añado
        if (appStore.getState().ejercicios.find((e) => e.id === ejercicio.id)) return;

        set((state) => ({ ejercicios: [...state.ejercicios, ejercicio] }));
      },
      removeEjercicio: (idEjercicio: number) => {
        // If the exercise is a strength exercise, update the total weight lifted
        const ejercicio = appStore.getState().ejercicios.find((e) => e.id === idEjercicio);

        if (ejercicio?.tipo === 'Fuerza') {
          set((state) => {
            const totalWeight = state.seriesFuerza
              .filter((serie) => serie.idEjercicio != idEjercicio)
              .reduce((acc, serie) => acc + (serie.Peso ?? 0) * (serie.Repeticiones ?? 0), 0);
            return { volumen: totalWeight };
          });
        }

        //Borro las series de ese ejercicio
        set((state) => {
          const seriesCardio = state.seriesCardio.filter(
            (serie) => serie.idEjercicio !== idEjercicio
          );
          const seriesFuerza = state.seriesFuerza.filter(
            (serie) => serie.idEjercicio !== idEjercicio
          );
          const seriesCalistenia = state.seriesCalistenia.filter(
            (serie) => serie.idEjercicio !== idEjercicio
          );

          return {
            ejercicios: state.ejercicios.filter((ejercicio) => ejercicio.id !== idEjercicio),
            seriesCardio,
            seriesFuerza,
            seriesCalistenia,
          };
        }),
          set((state) => ({
            ejercicios: state.ejercicios.filter((ejercicio) => ejercicio.id !== idEjercicio),
          }));
      },
      addSerieEjercicio: (
        serie: SerieCardioType | SerieFuerzaType | SerieCalisteniaType,
        idEjercicio: number
      ) =>
        set((state) => {
          //Consigo el ejercicio con la id
          const ejercicio = state.ejercicios.find((e) => e.id == idEjercicio);

          if (!ejercicio) return state;

          if (ejercicio.tipo === 'Cardio') {
            if ((serie as SerieCardioType).check) {
              set((state) => {
                const calorias = state.calorias + ((serie as SerieCardioType).Calorias ?? 0);
                return { calorias };
              });
            }

            return { seriesCardio: [...state.seriesCardio, serie as SerieCardioType] };
          } else if (ejercicio.tipo === 'Fuerza') {
            // If the serie is checked, update the total weight lifted
            if ((serie as SerieFuerzaType).check) {
              set((state) => {
                const seriesWeight =
                  ((serie as SerieFuerzaType).Peso ?? 0) *
                  ((serie as SerieFuerzaType).Repeticiones ?? 0);
                const volumen = state.volumen;

                return {
                  volumen: volumen + seriesWeight,
                };
              });
            }

            return { seriesFuerza: [...state.seriesFuerza, serie as SerieFuerzaType] };
          } else if (ejercicio.tipo === 'Calistenia') {
            return { seriesCalistenia: [...state.seriesCalistenia, serie as SerieCalisteniaType] };
          }
          return state;
        }),
      removeSerieEjercicio: (idSerie: number) => {
        // Check if the serie is a strength serie
        const serieFuerza = appStore.getState().seriesFuerza.find((serie) => serie.id === idSerie);

        // If it is, update the total weight lifted
        if (serieFuerza && serieFuerza.check) {
          set((state) => {
            const seriesWeight = (serieFuerza.Peso ?? 0) * (serieFuerza.Repeticiones ?? 0);
            const volumen = state.volumen;

            return {
              volumen: volumen - seriesWeight,
            };
          });
        }

        //Check if the serie is a cardio serie
        const serieCardio = appStore.getState().seriesCardio.find((serie) => serie.id === idSerie);

        // If it is, update the total calories burned
        if (serieCardio && serieCardio.check) {
          set((state) => {
            const calorias = state.calorias - (serieCardio.Calorias ?? 0);
            return { calorias };
          });
        }

        set((state) => {
          const seriesCardio = state.seriesCardio.filter((serie) => serie.id !== idSerie);
          const seriesFuerza = state.seriesFuerza.filter((serie) => serie.id !== idSerie);
          const seriesCalistenia = state.seriesCalistenia.filter((serie) => serie.id !== idSerie);
          return { seriesCardio, seriesFuerza, seriesCalistenia };
        });
      },
      calcularVolumen: () =>
        set((state) => {
          const volumen = state.seriesFuerza.reduce(
            (acc, serie) => acc + (serie.Peso ?? 0) * (serie.Repeticiones ?? 0),
            0
          );
          return { volumen };
        }),
      calcularCalorias: () =>
        set((state) => {
          let calorias = state.seriesCardio.reduce((acc, serie) => acc + (serie.Calorias ?? 0), 0);
          return { calorias };
        }),
      resetEntrenamiento: () =>
        set(() => ({
          //isRunning: false,
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
      getSeriesCardioByEjericio: (idEjercicio: number): SerieCardioType[] =>
        appStore
          .getState()
          .seriesCardio.filter((serie: SerieCardioType) => serie.idEjercicio === idEjercicio),
      getSeriesFuerzaByEjericio: (idEjercicio: number): SerieFuerzaType[] =>
        appStore
          .getState()
          .seriesFuerza.filter((serie: SerieFuerzaType) => serie.idEjercicio === idEjercicio),
      getSeriesCalisteniaByEjericio: (idEjercicio: number): SerieCalisteniaType[] =>
        appStore
          .getState()
          .seriesCalistenia.filter(
            (serie: SerieCalisteniaType) => serie.idEjercicio === idEjercicio
          ),
      getSeriesByEjericio: (
        idEjercicio: number
      ): SerieCalisteniaType[] | SerieCardioType[] | SerieFuerzaType[] | null => {
        //Consigo el ejercicio con la id
        const ejercicio = appStore.getState().ejercicios.find((e) => e.id == idEjercicio);

        if (!ejercicio) return null;

        if (ejercicio.tipo === 'Cardio') {
          return appStore
            .getState()
            .seriesCardio.filter((serie) => serie.idEjercicio === idEjercicio);
        } else if (ejercicio.tipo === 'Fuerza') {
          return appStore
            .getState()
            .seriesFuerza.filter((serie) => serie.idEjercicio === idEjercicio);
        } else if (ejercicio.tipo === 'Calistenia') {
          return appStore
            .getState()
            .seriesCalistenia.filter((serie) => serie.idEjercicio === idEjercicio);
        }

        return null;
      },
      updateSerieFuerzaPeso: (idSerie: number, peso: number) => {
        set((state) => ({
          seriesFuerza: state.seriesFuerza.map((serie) =>
            serie.id === idSerie ? { ...serie, Peso: peso } : serie
          ),
        }));

        // Get series and see if it is checked
        const serie = appStore.getState().seriesFuerza.find((serie) => serie.id === idSerie);

        if (serie?.check == false) return;

        // Get previous weight lifted in the series
        const totalWeight = appStore
          .getState()
          .seriesFuerza.reduce(
            (acc, serie) => acc + (serie.Peso ?? 0) * (serie.Repeticiones ?? 0),
            0
          );

        // Update total weight lifted
        set((state) => {
          const newTotalWeight =
            totalWeight -
            (state.seriesFuerza.find((serie) => serie.id === idSerie)?.Peso ?? 0) *
              (state.seriesFuerza.find((serie) => serie.id === idSerie)?.Repeticiones ?? 0) +
            peso * (state.seriesFuerza.find((serie) => serie.id === idSerie)?.Repeticiones ?? 0);
          return { volumen: newTotalWeight };
        });
      },
      updateSerieFuerzaRepeticiones: (idSerie: number, repeticiones: number) => {
        set((state) => ({
          seriesFuerza: state.seriesFuerza.map((serie) =>
            serie.id === idSerie ? { ...serie, Repeticiones: repeticiones } : serie
          ),
        }));
        // Get series and see if it is checked
        const serie = appStore.getState().seriesFuerza.find((serie) => serie.id === idSerie);

        if (serie?.check == false) return;
        // Get previous weight lifted in the series
        const totalWeight = appStore
          .getState()
          .seriesFuerza.reduce(
            (acc, serie) => acc + (serie.Peso ?? 0) * (serie.Repeticiones ?? 0),
            0
          );

        // Update total weight lifted
        set((state) => {
          const newTotalWeight =
            totalWeight -
            (state.seriesFuerza.find((serie) => serie.id === idSerie)?.Peso ?? 0) *
              (state.seriesFuerza.find((serie) => serie.id === idSerie)?.Repeticiones ?? 0) +
            (state.seriesFuerza.find((serie) => serie.id === idSerie)?.Peso ?? 0) * repeticiones;
          return { volumen: newTotalWeight };
        });
      },
      updateSerieCardioDistancia: (idSerie: number, distancia: number) =>
        set((state) => ({
          seriesCardio: state.seriesCardio.map((serie) =>
            serie.id === idSerie ? { ...serie, Distancia: distancia } : serie
          ),
        })),
      updateSerieCardioTiempo: (idSerie: number, tiempo: string) =>
        set((state) => ({
          seriesCardio: state.seriesCardio.map((serie) =>
            serie.id === idSerie ? { ...serie, Tiempo: tiempo } : serie
          ),
        })),
      updateSerieCardioCalorias: (idSerie: number, calorias: number) => {
        set((state) => ({
          seriesCardio: state.seriesCardio.map((serie) =>
            serie.id === idSerie ? { ...serie, Calorias: calorias } : serie
          ),
        }));

        // Get series and see if it is checked
        const serie = appStore.getState().seriesCardio.find((serie) => serie.id === idSerie);

        if (serie?.check == false) return;

        // Get previous calories burned in the series
        const totalCalories = appStore
          .getState()
          .seriesCardio.reduce((acc, serie) => acc + (serie.Calorias ?? 0), 0);

        // Update total calories burned
        set((state) => {
          const newTotalCalories =
            totalCalories -
            (state.seriesCardio.find((serie) => serie.id === idSerie)?.Calorias ?? 0) +
            calorias;
          return { calorias: newTotalCalories };
        });
      },
      updateSerieCalisteniaRepeticiones: (idSerie: number, repeticiones: number) =>
        set((state) => ({
          seriesCalistenia: state.seriesCalistenia.map((serie) =>
            serie.id === idSerie ? { ...serie, Repeticiones: repeticiones } : serie
          ),
        })),
      updateCheckSerie: (idSerie: number, isCheck: boolean) => {
        //Get serie and check type
        const serie =
          appStore.getState().seriesFuerza.find((serie) => serie.id === idSerie) ||
          appStore.getState().seriesCardio.find((serie) => serie.id === idSerie) ||
          appStore.getState().seriesCalistenia.find((serie) => serie.id === idSerie);

        //Get ejercicio
        const ejercicio = appStore.getState().ejercicios.find((e) => e.id === serie?.idEjercicio);

        //If the serie is not strength, return
        if (!serie || !ejercicio) return;

        if (ejercicio.tipo === 'Fuerza') {
          //Update serie
          set((state) => ({
            seriesFuerza: state.seriesFuerza.map((serie) =>
              serie.id === idSerie ? { ...serie, check: isCheck } : serie
            ),
          }));
          //Get weight lifted in the series
          const totalWeight =
            ejercicio.tipo === 'Fuerza'
              ? ((serie as SerieFuerzaType).Peso ?? 0) *
                ((serie as SerieFuerzaType).Repeticiones ?? 0)
              : 0;

          //Update total weight lifted
          set((state) => {
            const newTotalWeight = state.volumen + (isCheck ? totalWeight : -totalWeight);
            return { volumen: newTotalWeight };
          });
        } else if (ejercicio.tipo === 'Cardio') {
          //Update serie
          set((state) => ({
            seriesCardio: state.seriesCardio.map((serie) =>
              serie.id === idSerie ? { ...serie, check: isCheck } : serie
            ),
          }));
          //Get calories burned in the series
          const calories = (serie as SerieCardioType).Calorias ?? 0;

          //Update total calories burned
          set((state) => {
            const newTotalCalories = state.calorias + (isCheck ? calories : -calories);
            return { calorias: newTotalCalories };
          });
        } else if (ejercicio.tipo === 'Calistenia') {
          //Update serie
          set((state) => ({
            seriesCalistenia: state.seriesCalistenia.map((serie) =>
              serie.id === idSerie ? { ...serie, check: isCheck } : serie
            ),
          }));
        }
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
      onRehydrateStorage: (state: EntrenamientoState) => {
        if (state) {
          state.seconds = state.seconds || 0;
        }
      },
    }
  )
);

export default appStore;
