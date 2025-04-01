import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import uuid from 'react-native-uuid';

import { Database } from '~/src/database.types';

import moment from 'moment';

export interface EntrenamientoState {
  isRunning: boolean; // El cronómetro está en marcha
  entrenamientoTerminado: boolean; // El entrenamiento ha terminado
  titulo: string;
  notas: string;
  sensacion: Database['public']['Enums']['sensaciones_enum'];
  imagen: string[];
  numero: number;
  seconds: number;
  volumen: number;
  calorias: number;
  fecha: string;
  ejercicios: Database['public']['Tables']['ejercicios']['Row'][];
  seriesCardio: Database['public']['Tables']['series_cardio']['Row'][];
  seriesFuerza: Database['public']['Tables']['series_fuerza']['Row'][];
  seriesCalistenia: Database['public']['Tables']['series_calistenia']['Row'][];
  setSeconds: (seconds: number) => void;
  setIsRunning: (isRunning: boolean) => void;
  setEntrenamientoTerminado: (entrenamientoTerminado: boolean) => void;
  setTitulo: (titulo: string) => void;
  setNotas: (notas: string) => void;
  setSensacion: (sensacion: Database['public']['Enums']['sensaciones_enum']) => void;
  setImagen: (imagen: string) => void;
  stopTimer: () => void;
  startTimer: () => void;
  formatTime: (seconds: number) => string;
  addEjercicio: (ejercicio: Database['public']['Tables']['ejercicios']['Row']) => void;
  removeEjercicio: (idEjercicio: string) => void;
  addSerieEjercicio: (
    serie:
      | Database['public']['Tables']['series_cardio']['Row']
      | Database['public']['Tables']['series_fuerza']['Row']
      | Database['public']['Tables']['series_calistenia']['Row'],
    idEjercicio: string
  ) => void;
  removeSerieEjercicio: (idSerie: string) => void;
  calcularVolumen: () => void;
  calcularCalorias: () => void;
  resetEntrenamiento: () => void;
  setFecha: (fecha: string) => void;
  getSeriesCardioByEjericio: (
    idEjercicio: string
  ) => Database['public']['Tables']['series_cardio']['Row'][] | null;
  getSeriesFuerzaByEjericio: (
    idEjercicio: string
  ) => Database['public']['Tables']['series_fuerza']['Row'][] | null;
  getSeriesCalisteniaByEjericio: (
    idEjercicio: string
  ) => Database['public']['Tables']['series_calistenia']['Row'][] | null;
  getSeriesByEjericio: (
    idEjercicio: string
  ) =>
    | Database['public']['Tables']['series_cardio']['Row'][]
    | Database['public']['Tables']['series_fuerza']['Row'][]
    | Database['public']['Tables']['series_calistenia']['Row'][]
    | null;
  updateSerieFuerzaPeso: (idSerie: string, peso: number) => void;
  updateSerieFuerzaRepeticiones: (idSerie: string, repeticiones: number) => void;
  updateSerieCardioDistancia: (idSerie: string, distancia: number) => void;
  updateSerieCardioTiempo: (idSerie: string, tiempo: string) => void;
  updateSerieCardioCalorias: (idSerie: string, calorias: number) => void;
  updateSerieCalisteniaRepeticiones: (idSerie: string, repeticiones: number) => void;
  updateCheckSerie: (idSerie: string, isCheck: boolean) => void;
  allSeriesChecked: () => boolean;
  getNumeroSeries: () => number;
}

export const entrenamientoStore = create<EntrenamientoState>()(
  persist(
    (set) => ({
      isRunning: false,
      entrenamientoTerminado: false,
      titulo: '',
      notas: '',
      sensacion: 'Neutro',
      imagen: [],
      numero: 0,
      seconds: 0,
      volumen: 0,
      calorias: 0,
      fecha: moment().format('YYYY-MM-DD'),
      ejercicios: [],
      seriesCardio: [],
      seriesFuerza: [],
      seriesCalistenia: [],
      setSeconds: (seconds: number) => set({ seconds }),
      setEntrenamientoTerminado: (entrenamientoTerminado: boolean) =>
        set({ entrenamientoTerminado }),
      setIsRunning: (isRunning: boolean) => set({ isRunning }),
      setTitulo: (titulo: string) => set({ titulo }),
      setNotas: (notas: string) => set({ notas }),
      setSensacion: (sensacion: Database['public']['Enums']['sensaciones_enum']) =>
        set({ sensacion }),
      setImagen: (imagen: string) => set((state) => ({ imagen: [...state.imagen, imagen] })),
      stopTimer: () => set({ isRunning: false }),
      startTimer: () => {
        set((state) => {
          if (!state.entrenamientoTerminado) return state;
          return { isRunning: true };
        });
      },
      formatTime: (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor(seconds / 60) % 60;
        const secs = seconds % 60;
        return hours
          ? `${hours < 10 ? '0' : ''}${hours}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`
          : `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
      },
      addEjercicio: (ejercicio: Database['public']['Tables']['ejercicios']['Row']) => {
        if (!ejercicio) return;

        //Si el ejercicio ya está en la lista, no lo añado
        if (entrenamientoStore.getState().ejercicios.find((e) => e.id === ejercicio.id)) return;

        set((state) => ({ ejercicios: [...state.ejercicios, ejercicio] }));
      },
      removeEjercicio: (idEjercicio: string) => {
        // If the exercise is a strength exercise, update the total weight lifted
        const ejercicio = entrenamientoStore
          .getState()
          .ejercicios.find((e) => e.id === idEjercicio);

        if (ejercicio?.tipo_ejercicio === 'fuerza') {
          set((state) => {
            const totalWeight = state.seriesFuerza
              .filter((serie) => serie.id_ejercicio != idEjercicio)
              .reduce((acc, serie) => acc + (serie.peso ?? 0) * (serie.repeticiones ?? 0), 0);
            return { volumen: totalWeight };
          });
        }

        //Borro las series de ese ejercicio
        set((state) => {
          const seriesCardio = state.seriesCardio.filter(
            (serie) => serie.id_ejercicio !== idEjercicio
          );
          const seriesFuerza = state.seriesFuerza.filter(
            (serie) => serie.id_ejercicio !== idEjercicio
          );
          const seriesCalistenia = state.seriesCalistenia.filter(
            (serie) => serie.id_ejercicio !== idEjercicio
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
        serie:
          | Database['public']['Tables']['series_cardio']['Row']
          | Database['public']['Tables']['series_fuerza']['Row']
          | Database['public']['Tables']['series_calistenia']['Row'],
        idEjercicio: string
      ) =>
        set((state) => {
          //Consigo el ejercicio con la id
          const ejercicio = state.ejercicios.find((e) => e.id == idEjercicio);

          if (!ejercicio) {
            return state;
          }

          // Añado un id a la serie usando uuid
          const nuevaSerie = { ...serie, id: uuid.v4() };

          if (ejercicio.tipo_ejercicio === 'cardio') {
            if ((serie as Database['public']['Tables']['series_cardio']['Row']).check) {
              set((state) => {
                const calorias =
                  state.calorias +
                  ((nuevaSerie as Database['public']['Tables']['series_cardio']['Row']).calorias ??
                    0);
                return { calorias };
              });
            }

            return {
              seriesCardio: [
                ...state.seriesCardio,
                nuevaSerie as Database['public']['Tables']['series_cardio']['Row'],
              ],
            };
          } else if (ejercicio.tipo_ejercicio === 'fuerza') {
            // If the serie is checked, update the total weight lifted
            if ((serie as Database['public']['Tables']['series_fuerza']['Row']).check) {
              set((state) => {
                const seriesWeight =
                  ((serie as Database['public']['Tables']['series_fuerza']['Row']).peso ?? 0) *
                  ((serie as Database['public']['Tables']['series_fuerza']['Row']).repeticiones ??
                    0);
                const volumen = state.volumen;

                return {
                  volumen: volumen + seriesWeight,
                };
              });
            }

            return {
              seriesFuerza: [
                ...state.seriesFuerza,
                nuevaSerie as Database['public']['Tables']['series_fuerza']['Row'],
              ],
            };
          } else if (ejercicio.tipo_ejercicio === 'calistenia') {
            return {
              seriesCalistenia: [
                ...state.seriesCalistenia,
                nuevaSerie as Database['public']['Tables']['series_calistenia']['Row'],
              ],
            };
          }
          return state;
        }),
      removeSerieEjercicio: (idSerie: string) => {
        // Check if the serie is a strength serie
        const serieFuerza = entrenamientoStore
          .getState()
          .seriesFuerza.find((serie) => serie.id === idSerie);

        // If it is, update the total weight lifted
        if (serieFuerza && serieFuerza.check) {
          set((state) => {
            const seriesWeight = (serieFuerza.peso ?? 0) * (serieFuerza.repeticiones ?? 0);
            const volumen = state.volumen;

            return {
              volumen: volumen - seriesWeight,
            };
          });
        }

        //Check if the serie is a cardio serie
        const serieCardio = entrenamientoStore
          .getState()
          .seriesCardio.find((serie) => serie.id === idSerie);

        // If it is, update the total calories burned
        if (serieCardio && serieCardio.check) {
          set((state) => {
            const calorias = state.calorias - (serieCardio.calorias ?? 0);
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
            (acc, serie) => acc + (serie.peso ?? 0) * (serie.repeticiones ?? 0),
            0
          );
          return { volumen };
        }),
      calcularCalorias: () =>
        set((state) => {
          let calorias = state.seriesCardio.reduce((acc, serie) => acc + (serie.calorias ?? 0), 0);
          return { calorias };
        }),
      resetEntrenamiento: () =>
        set(() => ({
          isRunning: false,
          entrenamientoTerminado: true,
          seconds: 0,
          volumen: 0,
          calorias: 0,
          titulo: '',
          notas: '',
          sensacion: 'Neutro',
          fecha: moment().format('YYYY-MM-DD'),
          ejercicios: [],
          seriesCardio: [],
          seriesFuerza: [],
          seriesCalistenia: [],

          //imagen: string[];
        })),
      setFecha: (fecha: string) => set({ fecha }),
      getSeriesCardioByEjericio: (
        idEjercicio: string
      ): Database['public']['Tables']['series_cardio']['Row'][] =>
        entrenamientoStore
          .getState()
          .seriesCardio.filter(
            (serie: Database['public']['Tables']['series_cardio']['Row']) =>
              serie.id_ejercicio === idEjercicio
          ),
      getSeriesFuerzaByEjericio: (
        idEjercicio: string
      ): Database['public']['Tables']['series_fuerza']['Row'][] =>
        entrenamientoStore
          .getState()
          .seriesFuerza.filter(
            (serie: Database['public']['Tables']['series_fuerza']['Row']) =>
              serie.id_ejercicio === idEjercicio
          ),
      getSeriesCalisteniaByEjericio: (
        idEjercicio: string
      ): Database['public']['Tables']['series_calistenia']['Row'][] =>
        entrenamientoStore
          .getState()
          .seriesCalistenia.filter(
            (serie: Database['public']['Tables']['series_calistenia']['Row']) =>
              serie.id_ejercicio === idEjercicio
          ),
      getSeriesByEjericio: (
        idEjercicio: string
      ):
        | Database['public']['Tables']['series_calistenia']['Row'][]
        | Database['public']['Tables']['series_cardio']['Row'][]
        | Database['public']['Tables']['series_fuerza']['Row'][]
        | null => {
        //Consigo el ejercicio con la id
        const ejercicio = entrenamientoStore.getState().ejercicios.find((e) => e.id == idEjercicio);

        if (!ejercicio) return null;

        if (ejercicio.tipo_ejercicio === 'cardio') {
          return entrenamientoStore
            .getState()
            .seriesCardio.filter((serie) => serie.id_ejercicio === idEjercicio);
        } else if (ejercicio.tipo_ejercicio === 'fuerza') {
          return entrenamientoStore
            .getState()
            .seriesFuerza.filter((serie) => serie.id_ejercicio === idEjercicio);
        } else if (ejercicio.tipo_ejercicio === 'calistenia') {
          return entrenamientoStore
            .getState()
            .seriesCalistenia.filter((serie) => serie.id_ejercicio === idEjercicio);
        }

        return null;
      },
      updateSerieFuerzaPeso: (idSerie: string, peso: number) => {
        set((state) => ({
          seriesFuerza: state.seriesFuerza.map((serie) =>
            serie.id === idSerie ? { ...serie, peso: peso } : serie
          ),
        }));

        // Get series and see if it is checked
        const serie = entrenamientoStore
          .getState()
          .seriesFuerza.find((serie) => serie.id === idSerie);

        if (serie?.check == false) return;

        // Get previous weight lifted in the series
        const totalWeight = entrenamientoStore
          .getState()
          .seriesFuerza.reduce(
            (acc, serie) => acc + (serie.peso ?? 0) * (serie.repeticiones ?? 0),
            0
          );

        // Update total weight lifted
        set((state) => {
          const newTotalWeight =
            totalWeight -
            (state.seriesFuerza.find((serie) => serie.id === idSerie)?.peso ?? 0) *
              (state.seriesFuerza.find((serie) => serie.id === idSerie)?.repeticiones ?? 0) +
            peso * (state.seriesFuerza.find((serie) => serie.id === idSerie)?.repeticiones ?? 0);
          return { volumen: newTotalWeight };
        });
      },
      updateSerieFuerzaRepeticiones: (idSerie: string, repeticiones: number) => {
        set((state) => ({
          seriesFuerza: state.seriesFuerza.map((serie) =>
            serie.id === idSerie ? { ...serie, repeticiones: repeticiones } : serie
          ),
        }));
        // Get series and see if it is checked
        const serie = entrenamientoStore
          .getState()
          .seriesFuerza.find((serie) => serie.id === idSerie);

        if (serie?.check == false) return;
        // Get previous weight lifted in the series
        const totalWeight = entrenamientoStore
          .getState()
          .seriesFuerza.reduce(
            (acc, serie) => acc + (serie.peso ?? 0) * (serie.repeticiones ?? 0),
            0
          );

        // Update total weight lifted
        set((state) => {
          const newTotalWeight =
            totalWeight -
            (state.seriesFuerza.find((serie) => serie.id === idSerie)?.peso ?? 0) *
              (state.seriesFuerza.find((serie) => serie.id === idSerie)?.repeticiones ?? 0) +
            (state.seriesFuerza.find((serie) => serie.id === idSerie)?.peso ?? 0) * repeticiones;
          return { volumen: newTotalWeight };
        });
      },
      updateSerieCardioDistancia: (idSerie: string, distancia: number) =>
        set((state) => ({
          seriesCardio: state.seriesCardio.map((serie) =>
            serie.id === idSerie ? { ...serie, distancia: distancia } : serie
          ),
        })),
      updateSerieCardioTiempo: (idSerie: string, tiempo: string) =>
        set((state) => ({
          seriesCardio: state.seriesCardio.map((serie) =>
            serie.id === idSerie ? { ...serie, Tiempo: tiempo } : serie
          ),
        })),
      updateSerieCardioCalorias: (idSerie: string, calorias: number) => {
        set((state) => ({
          seriesCardio: state.seriesCardio.map((serie) =>
            serie.id === idSerie ? { ...serie, calorias: calorias } : serie
          ),
        }));

        // Get series and see if it is checked
        const serie = entrenamientoStore
          .getState()
          .seriesCardio.find((serie) => serie.id === idSerie);

        if (serie?.check == false) return;

        // Get previous calories burned in the series
        const totalCalories = entrenamientoStore
          .getState()
          .seriesCardio.reduce((acc, serie) => acc + (serie.calorias ?? 0), 0);

        // Update total calories burned
        set((state) => {
          const newTotalCalories =
            totalCalories -
            (state.seriesCardio.find((serie) => serie.id === idSerie)?.calorias ?? 0) +
            calorias;
          return { calorias: newTotalCalories };
        });
      },
      updateSerieCalisteniaRepeticiones: (idSerie: string, repeticiones: number) =>
        set((state) => ({
          seriesCalistenia: state.seriesCalistenia.map((serie) =>
            serie.id === idSerie ? { ...serie, repeticiones: repeticiones } : serie
          ),
        })),
      updateCheckSerie: (idSerie: string, isCheck: boolean) => {
        //Get serie and check type
        const serie =
          entrenamientoStore.getState().seriesFuerza.find((serie) => serie.id === idSerie) ||
          entrenamientoStore.getState().seriesCardio.find((serie) => serie.id === idSerie) ||
          entrenamientoStore.getState().seriesCalistenia.find((serie) => serie.id === idSerie);

        //Get ejercicio
        const ejercicio = entrenamientoStore
          .getState()
          .ejercicios.find((e) => e.id === serie?.id_ejercicio);

        //If the serie is not strength, return
        if (!serie || !ejercicio) return;

        if (ejercicio.tipo_ejercicio === 'fuerza') {
          //Update serie
          set((state) => ({
            seriesFuerza: state.seriesFuerza.map((serie) =>
              serie.id === idSerie ? { ...serie, check: isCheck } : serie
            ),
          }));
          //Get weight lifted in the series
          const totalWeight =
            ejercicio.tipo_ejercicio === 'fuerza'
              ? ((serie as Database['public']['Tables']['series_fuerza']['Row']).peso ?? 0) *
                ((serie as Database['public']['Tables']['series_fuerza']['Row']).repeticiones ?? 0)
              : 0;

          //Update total weight lifted
          set((state) => {
            const newTotalWeight = state.volumen + (isCheck ? totalWeight : -totalWeight);
            return { volumen: newTotalWeight };
          });
        } else if (ejercicio.tipo_ejercicio === 'cardio') {
          //Update serie
          set((state) => ({
            seriesCardio: state.seriesCardio.map((serie) =>
              serie.id === idSerie ? { ...serie, check: isCheck } : serie
            ),
          }));
          //Get calories burned in the series
          const calories =
            (serie as Database['public']['Tables']['series_cardio']['Row']).calorias ?? 0;

          //Update total calories burned
          set((state) => {
            const newTotalCalories = state.calorias + (isCheck ? calories : -calories);
            return { calorias: newTotalCalories };
          });
        } else if (ejercicio.tipo_ejercicio === 'calistenia') {
          //Update serie
          set((state) => ({
            seriesCalistenia: state.seriesCalistenia.map((serie) =>
              serie.id === idSerie ? { ...serie, check: isCheck } : serie
            ),
          }));
        }
      },
      allSeriesChecked: () => {
        const seriesFuerza = entrenamientoStore.getState()
          .seriesFuerza as Database['public']['Tables']['series_fuerza']['Row'][];
        const serieCardio = entrenamientoStore.getState()
          .seriesCardio as Database['public']['Tables']['series_cardio']['Row'][];
        const seriesCalistenia = entrenamientoStore.getState()
          .seriesCalistenia as Database['public']['Tables']['series_calistenia']['Row'][];

        const allCheckedFuerza = seriesFuerza.every((serie) => serie.check === true);
        const allCheckedCardio = serieCardio.every((serie) => serie.check);
        const allCheckedCalistenia = seriesCalistenia.every((serie) => serie.check);

        return allCheckedFuerza && allCheckedCardio && allCheckedCalistenia;
      },
      getNumeroSeries: () => {
        const seriesFuerza = entrenamientoStore.getState()
          .seriesFuerza as Database['public']['Tables']['series_fuerza']['Row'][];
        const serieCardio = entrenamientoStore.getState()
          .seriesCardio as Database['public']['Tables']['series_cardio']['Row'][];
        const seriesCalistenia = entrenamientoStore.getState()
          .seriesCalistenia as Database['public']['Tables']['series_calistenia']['Row'][];

        return seriesFuerza.length + serieCardio.length + seriesCalistenia.length;
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
          //state.seconds = state.seconds || 0; // Ensure that the timer keeps running
        }
      },
    }
  )
);

export default entrenamientoStore;
