import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import uuid from 'react-native-uuid';

import { Database } from '~/src/database.types';
import { NutricionInfo } from '../types/types';

import { useInsertNutricion, useInsertAlimento } from '@api/nutricion';

import moment from 'moment';

export interface NutricionState {
  fecha: string;
  macros: NutricionInfo;
  periodos: Partial<
    Record<
      Database['public']['Enums']['tipo_nutricion_enum'],
      {
        alimentos: {
          alimento: Database['public']['Tables']['alimento']['Row'];
          cantidad: number;
        }[];
        macros: NutricionInfo;
      }
    >
  >;
  imagenesPeriodos: Partial<
    Record<Database['public']['Enums']['tipo_nutricion_enum'], { imagen: string; id: string }>
  >;
  checkAndResetIfNewDay: () => void;
  setFecha: (fecha: string) => void;
  setMacros: (macros: NutricionInfo) => void;
  updateMacros: () => void;
  setAlimentos: (
    tipo: Database['public']['Enums']['tipo_nutricion_enum'],
    alimentos: { alimento: Database['public']['Tables']['alimento']['Row']; cantidad: number }[]
  ) => void;
  setMacrosAlimentos: (
    tipo: Database['public']['Enums']['tipo_nutricion_enum'],
    macros: NutricionInfo
  ) => void;
  addAlimento: (
    tipo: Database['public']['Enums']['tipo_nutricion_enum'],
    alimento: { alimento: Database['public']['Tables']['alimento']['Row']; cantidad: number }
  ) => void;
  removeAlimento: (tipo: Database['public']['Enums']['tipo_nutricion_enum'], id: string) => void;
  clearAlimentos: (tipo: Database['public']['Enums']['tipo_nutricion_enum']) => void;
  clearAll: () => void;
  setNutricion: (nutricion: NutricionState) => void;
  getNutricion: () => NutricionState;
  getMacros: () => NutricionInfo;
  getAlimentos: (
    tipo: Database['public']['Enums']['tipo_nutricion_enum']
  ) => { alimento: Database['public']['Tables']['alimento']['Row']; cantidad: number }[];
  getMacrosAlimentos: (tipo: Database['public']['Enums']['tipo_nutricion_enum']) => NutricionInfo;
  getPeriodos: () => Partial<
    Record<
      Database['public']['Enums']['tipo_nutricion_enum'],
      {
        alimentos: {
          alimento: Database['public']['Tables']['alimento']['Row'];
          cantidad: number;
        }[];
        macros: NutricionInfo;
      }
    >
  >;
  addImagen: (tipo: Database['public']['Enums']['tipo_nutricion_enum'], imagen: string) => void;
  removeImagen: (tipo: Database['public']['Enums']['tipo_nutricion_enum']) => void;
  getImagen: (tipo: Database['public']['Enums']['tipo_nutricion_enum']) => string;
}

const useNutricionStore = create<NutricionState>()(
  persist(
    (set, get) => ({
      fecha: moment().format('YYYY-MM-DD'),
      macros: {
        Calorias: 0,
        Proteinas: 0,
        Carbohidratos: 0,
        Grasas: 0,
      },
      periodos: {
        Desayuno: {
          alimentos: [],
          macros: { Calorias: 0, Proteinas: 0, Carbohidratos: 0, Grasas: 0 },
        },
        Comida: {
          alimentos: [],
          macros: { Calorias: 0, Proteinas: 0, Carbohidratos: 0, Grasas: 0 },
        },
        Cena: { alimentos: [], macros: { Calorias: 0, Proteinas: 0, Carbohidratos: 0, Grasas: 0 } },
        Snacks: {
          alimentos: [],
          macros: { Calorias: 0, Proteinas: 0, Carbohidratos: 0, Grasas: 0 },
        },
      },
      imagenesPeriodos: {
        Desayuno: { imagen: '', id: uuid.v4() as string },
        Comida: { imagen: '', id: uuid.v4() as string },
        Cena: { imagen: '', id: uuid.v4() as string },
        Snacks: { imagen: '', id: uuid.v4() as string },
      },
      checkAndResetIfNewDay: () => {
        const storedDate = get().fecha;
        const today = moment().format('YYYY-MM-DD');

        if (!storedDate) {
          console.error('No hay fecha almacenada.');
          return;
        }
        if (storedDate === today) {
          console.log('La fecha almacenada es la misma que la de hoy. No se hace nada.');
          return;
        }

        // Hook personalizado para insertar una nutricion
        const insertNutricion = useInsertNutricion();
        const insertAlimento = useInsertAlimento();

        if (storedDate != today) {
          // Upload data before clearing
          insertNutricion.mutate({
            tipo_nutricion: 'Desayuno',
            calorias: get().periodos.Desayuno?.macros.Calorias || 0,
            proteina: get().periodos.Desayuno?.macros.Proteinas || 0,
            carbohidratos: get().periodos.Desayuno?.macros.Carbohidratos || 0,
            grasa: get().periodos.Desayuno?.macros.Grasas || 0,
            fecha: storedDate,
          });
          insertNutricion.mutate({
            tipo_nutricion: 'Comida',
            calorias: get().periodos.Comida?.macros.Calorias || 0,
            proteina: get().periodos.Comida?.macros.Proteinas || 0,
            carbohidratos: get().periodos.Comida?.macros.Carbohidratos || 0,
            grasa: get().periodos.Comida?.macros.Grasas || 0,
            fecha: storedDate,
          });
          insertNutricion.mutate({
            tipo_nutricion: 'Cena',
            calorias: get().periodos.Cena?.macros.Calorias || 0,
            proteina: get().periodos.Cena?.macros.Proteinas || 0,
            carbohidratos: get().periodos.Cena?.macros.Carbohidratos || 0,
            grasa: get().periodos.Cena?.macros.Grasas || 0,
            fecha: storedDate,
          });
          insertNutricion.mutate({
            tipo_nutricion: 'Snacks',
            calorias: get().periodos.Snacks?.macros.Calorias || 0,
            proteina: get().periodos.Snacks?.macros.Proteinas || 0,
            carbohidratos: get().periodos.Snacks?.macros.Carbohidratos || 0,
            grasa: get().periodos.Snacks?.macros.Grasas || 0,
            fecha: storedDate,
          });

          // Upload all alimentos
          const periodos = get().periodos;
          for (const periodo in periodos) {
            if (periodos[periodo as keyof typeof periodos]) {
              const alimentos = periodos[periodo as keyof typeof periodos]?.alimentos || [];
              for (const alimento of alimentos) {
                insertAlimento.mutate({
                  tipo_nutricion: periodo as Database['public']['Enums']['tipo_nutricion_enum'],
                  id_alimento: alimento.alimento.id,
                  cantidad: alimento.cantidad,
                  fecha_nutricion: storedDate,
                  user_id: '', //TODO: Lo paso vacío porque no tengo el user_id y lo consigo en el hook
                });
              }
            }
          }

          // If there is an error, do not reset the store

          // Reset store data
          set({
            fecha: today,
            macros: { Calorias: 0, Proteinas: 0, Carbohidratos: 0, Grasas: 0 },
            periodos: {
              Desayuno: {
                alimentos: [],
                macros: { Calorias: 0, Proteinas: 0, Carbohidratos: 0, Grasas: 0 },
              },
              Comida: {
                alimentos: [],
                macros: { Calorias: 0, Proteinas: 0, Carbohidratos: 0, Grasas: 0 },
              },
              Cena: {
                alimentos: [],
                macros: { Calorias: 0, Proteinas: 0, Carbohidratos: 0, Grasas: 0 },
              },
              Snacks: {
                alimentos: [],
                macros: { Calorias: 0, Proteinas: 0, Carbohidratos: 0, Grasas: 0 },
              },
            },
          });
          set({
            imagenesPeriodos: {
              Desayuno: { imagen: '', id: uuid.v4() as string },
              Comida: { imagen: '', id: uuid.v4() as string },
              Cena: { imagen: '', id: uuid.v4() as string },
              Snacks: { imagen: '', id: uuid.v4() as string },
            },
          });
        }
      },
      setFecha: (fecha) => set({ fecha }),
      setMacros: (macros) => set({ macros }),
      updateMacros: () => {
        // Sum all macros from all periods
        const periodos = get().periodos;
        const macros = {
          Calorias: 0,
          Proteinas: 0,
          Carbohidratos: 0,
          Grasas: 0,
        };
        for (const periodo in periodos) {
          if (periodos[periodo as keyof typeof periodos]) {
            macros.Calorias += periodos[periodo as keyof typeof periodos]?.macros.Calorias || 0;
            macros.Proteinas += periodos[periodo as keyof typeof periodos]?.macros.Proteinas || 0;
            macros.Carbohidratos +=
              periodos[periodo as keyof typeof periodos]?.macros.Carbohidratos || 0;
            macros.Grasas += periodos[periodo as keyof typeof periodos]?.macros.Grasas || 0;
          }
        }
        set({ macros });
      },
      setAlimentos: (tipo, alimentos) => {
        const periodos = get().periodos;
        if (periodos[tipo]) {
          periodos[tipo].alimentos = alimentos;
        }
        set({ periodos });
      },
      setMacrosAlimentos: (tipo, macros) => {
        const periodos = get().periodos;
        if (periodos[tipo]) {
          periodos[tipo].macros = macros;
        }
        set({ periodos });
      },
      // TODO: REVISAR MECROS DE PERIODO, CREO QUE LO HACE MAL
      addAlimento: (tipo, alimento) => {
        const periodos = get().periodos;
        if (!periodos[tipo]) {
          console.error(`Tipo de nutrición '${tipo}' no encontrado.`);
          return;
        }
        if (!alimento) {
          console.error('Alimento no válido.');
          return;
        }
        const alimentos = periodos[tipo].alimentos;
        const macros = periodos[tipo].macros;
        const newAlimento = { ...alimento };
        const newMacros = {
          Calorias: macros.Calorias + (alimento.alimento.calorias || 0),
          Proteinas: macros.Proteinas + (alimento.alimento.proteina || 0),
          Carbohidratos: macros.Carbohidratos + (alimento.alimento.carbohidratos || 0),
          Grasas: macros.Grasas + (alimento.alimento.grasa || 0),
        };
        periodos[tipo].alimentos = [...alimentos, newAlimento];
        periodos[tipo].macros = newMacros;

        // Update the main macros
        const mainMacros = get().macros;
        mainMacros.Calorias += newAlimento.alimento.calorias || 0;
        mainMacros.Proteinas += newAlimento.alimento.proteina || 0;
        mainMacros.Carbohidratos += newAlimento.alimento.carbohidratos || 0;
        mainMacros.Grasas += newAlimento.alimento.grasa || 0;
        set({ macros: mainMacros });

        set({ periodos });
      },
      // TODO: REVISAR MECROS DE PERIODO, CREO QUE LO HACE MAL
      removeAlimento: (tipo, id) => {
        const periodos = get().periodos;
        if (!periodos[tipo]) {
          console.error(`Tipo de nutrición '${tipo}' no encontrado.`);
          return;
        }
        const alimentos = periodos[tipo].alimentos;
        const macros = periodos[tipo].macros;
        const newAlimentos = alimentos.filter((alimento) => alimento.alimento.id !== id);
        const removedAlimento = alimentos.find((alimento) => alimento.alimento.id === id);
        if (removedAlimento) {
          const newMacros = {
            Calorias: macros.Calorias - (removedAlimento.alimento.calorias || 0),
            Proteinas: macros.Proteinas - (removedAlimento.alimento.proteina || 0),
            Carbohidratos: macros.Carbohidratos - (removedAlimento.alimento.carbohidratos || 0),
            Grasas: macros.Grasas - (removedAlimento.alimento.grasa || 0),
          };
          periodos[tipo].alimentos = newAlimentos;
          periodos[tipo].macros = newMacros;

          // Update the main macros
          const mainMacros = get().macros;
          mainMacros.Calorias -= removedAlimento.alimento.calorias || 0;
          mainMacros.Proteinas -= removedAlimento.alimento.proteina || 0;
          mainMacros.Carbohidratos -= removedAlimento.alimento.carbohidratos || 0;
          mainMacros.Grasas -= removedAlimento.alimento.grasa || 0;
          set({ macros: mainMacros });

          set({ periodos });
        }
      },
      clearAlimentos: (tipo) => {
        const periodos = get().periodos;
        if (!periodos[tipo]) {
          console.error(`Tipo de nutrición '${tipo}' no encontrado.`);
          return;
        }
        periodos[tipo].alimentos = [];
        periodos[tipo].macros = { Calorias: 0, Proteinas: 0, Carbohidratos: 0, Grasas: 0 };
        set({ periodos });
      },
      clearAll: () => {
        set({
          fecha: moment().format('YYYY-MM-DD'),
          macros: { Calorias: 0, Proteinas: 0, Carbohidratos: 0, Grasas: 0 },
          periodos: {
            Desayuno: {
              alimentos: [],
              macros: { Calorias: 0, Proteinas: 0, Carbohidratos: 0, Grasas: 0 },
            },
            Comida: {
              alimentos: [],
              macros: { Calorias: 0, Proteinas: 0, Carbohidratos: 0, Grasas: 0 },
            },
            Cena: {
              alimentos: [],
              macros: { Calorias: 0, Proteinas: 0, Carbohidratos: 0, Grasas: 0 },
            },
            Snacks: {
              alimentos: [],
              macros: { Calorias: 0, Proteinas: 0, Carbohidratos: 0, Grasas: 0 },
            },
          },
        });
      },
      setNutricion: (nutricion) => {
        set({
          fecha: nutricion.fecha,
          macros: nutricion.macros,
          periodos: nutricion.periodos,
        });
      },
      getNutricion: () => {
        return get();
      },
      getMacros: () => {
        return get().macros;
      },
      getAlimentos: (tipo) => {
        return get().periodos[tipo]?.alimentos || [];
      },
      getMacrosAlimentos: (tipo) => {
        return (
          get().periodos[tipo]?.macros || { Calorias: 0, Proteinas: 0, Carbohidratos: 0, Grasas: 0 }
        );
      },
      getPeriodos: () => {
        return get().periodos;
      },
      addImagen: (tipo, imagen) => {
        const imagenesPeriodos = get().imagenesPeriodos;
        if (imagenesPeriodos[tipo]) {
          imagenesPeriodos[tipo].imagen = imagen;
          set({ imagenesPeriodos });
        }
      },
      removeImagen: (tipo) => {
        const imagenesPeriodos = get().imagenesPeriodos;
        if (imagenesPeriodos[tipo]) {
          imagenesPeriodos[tipo].imagen = '';
          set({ imagenesPeriodos });
        }
      },
      getImagen: (tipo) => {
        return get().imagenesPeriodos[tipo]?.imagen || '';
      },
    }),
    {
      name: 'nutricion-storage',
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
      version: 1,
      migrate: async (persistedState: any) => {
        const storedDate = persistedState?.fecha;
        const today = moment().format('YYYY-MM-DD');

        if (storedDate && storedDate !== today) {
          // Upload data before clearing
          // TODO: Implement uploadData function
          // await uploadData(persistedState);

          // Reset store data
          return {
            ...persistedState,
            fecha: today,
            macros: { Calorias: 0, Proteinas: 0, Carbohidratos: 0, Grasas: 0 },
            periodos: {
              Desayuno: {
                alimentos: [],
                macros: { Calorias: 0, Proteinas: 0, Carbohidratos: 0, Grasas: 0 },
              },
              Comida: {
                alimentos: [],
                macros: { Calorias: 0, Proteinas: 0, Carbohidratos: 0, Grasas: 0 },
              },
              Cena: {
                alimentos: [],
                macros: { Calorias: 0, Proteinas: 0, Carbohidratos: 0, Grasas: 0 },
              },
              Snacks: {
                alimentos: [],
                macros: { Calorias: 0, Proteinas: 0, Carbohidratos: 0, Grasas: 0 },
              },
            },
            imagenesPeriodos: {
              Desayuno: { imagen: '', id: uuid.v4() as string },
              Comida: { imagen: '', id: uuid.v4() as string },
              Cena: { imagen: '', id: uuid.v4() as string },
              Snacks: { imagen: '', id: uuid.v4() as string },
            },
          };
        }
        return persistedState;
      },
    }
  )
);
export default useNutricionStore;
export { useNutricionStore };
