import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import uuid from 'react-native-uuid';

import { Database } from '~/src/database.types';
import { NutricionInfo } from '../types/types';

import moment from 'moment';

export interface NutricionState {
  fecha: string;
  macros: NutricionInfo;
  //desayuno: Database['public']['Tables']['alimento']['Row'][];
  //macrosDesayuno: NutricionInfo;
  //comida: Database['public']['Tables']['alimento']['Row'][];
  //macrosComida: NutricionInfo;
  //cena: Database['public']['Tables']['alimento']['Row'][];
  //macrosCena: NutricionInfo;
  //snacks: Database['public']['Tables']['alimento']['Row'][];
  //macrosSnacks: NutricionInfo;
  periodos: Partial<
    Record<
      Database['public']['Enums']['tipo_nutricion_enum'],
      { alimentos: Database['public']['Tables']['alimento']['Row'][]; macros: NutricionInfo }
    >
  >;
  setFecha: (fecha: string) => void;
  setMacros: (macros: NutricionInfo) => void;
  setAlimentos: (
    tipo: Database['public']['Enums']['tipo_nutricion_enum'],
    alimentos: Database['public']['Tables']['alimento']['Row'][]
  ) => void;
  setMacrosAlimentos: (
    tipo: Database['public']['Enums']['tipo_nutricion_enum'],
    macros: NutricionInfo
  ) => void;
  addAlimento: (
    tipo: Database['public']['Enums']['tipo_nutricion_enum'],
    alimento: Database['public']['Tables']['alimento']['Row']
  ) => void;
  removeAlimento: (tipo: Database['public']['Enums']['tipo_nutricion_enum'], id: string) => void;
  clearAlimentos: (tipo: Database['public']['Enums']['tipo_nutricion_enum']) => void;
  clearAll: () => void;
  setNutricion: (nutricion: NutricionState) => void;
  getNutricion: () => NutricionState;
  getMacros: () => NutricionInfo;
  getAlimentos: (
    tipo: Database['public']['Enums']['tipo_nutricion_enum']
  ) => Database['public']['Tables']['alimento']['Row'][];
  getMacrosAlimentos: (tipo: Database['public']['Enums']['tipo_nutricion_enum']) => NutricionInfo;
  getPeriodos: () => Partial<
    Record<
      Database['public']['Enums']['tipo_nutricion_enum'],
      { alimentos: Database['public']['Tables']['alimento']['Row'][]; macros: NutricionInfo }
    >
  >;
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
      setFecha: (fecha) => set({ fecha }),
      setMacros: (macros) => set({ macros }),
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
          Calorias: macros.Calorias + (alimento.calorias || 0),
          Proteinas: macros.Proteinas + (alimento.proteina || 0),
          Carbohidratos: macros.Carbohidratos + (alimento.carbohidratos || 0),
          Grasas: macros.Grasas + (alimento.grasa || 0),
        };
        periodos[tipo].alimentos = [...alimentos, newAlimento];
        periodos[tipo].macros = newMacros;
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
        const newAlimentos = alimentos.filter((alimento) => alimento.id !== id);
        const removedAlimento = alimentos.find((alimento) => alimento.id === id);
        if (removedAlimento) {
          const newMacros = {
            Calorias: macros.Calorias - (removedAlimento.calorias || 0),
            Proteinas: macros.Proteinas - (removedAlimento.proteina || 0),
            Carbohidratos: macros.Carbohidratos - (removedAlimento.carbohidratos || 0),
            Grasas: macros.Grasas - (removedAlimento.grasa || 0),
          };
          periodos[tipo].alimentos = newAlimentos;
          periodos[tipo].macros = newMacros;
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
    }),
    {
      name: 'nutricion-storage',
      getStorage: () => AsyncStorage,
      version: 1,
      migrate: (state) => {
        // Perform migration logic here if needed
        return state;
      },
    }
  )
);
export default useNutricionStore;
export { useNutricionStore };
