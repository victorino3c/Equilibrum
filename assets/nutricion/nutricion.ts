// ~/assets/ejercicio/ejercicio.ts

import { Database } from '~/src/database.types';

export enum TipoPeriodo {
  Desayuno = 'Desayuno',
  Comida = 'Comida',
  Cena = 'Cena',
  Snacks = 'Snacks',
}

export enum Medida {
  gramos = 'g',
  mililitros = 'ml',
  unidades = 'u',
  porcion = 'porcion',
  tamaño = 'tamaño',
}

type NutricionInfo = {
  Calorias: number;
  Proteinas: number;
  Carbohidratos: number;
  Grasas: number;
};

export type NutricionType = {
  fecha: string;
  idUsuario: string; //Temporal, esto deberia ser una relacion con la tabla de usuarios
  macros: NutricionInfo;
  Imagen?: string;
};

export type PeriodoType = {
  idNutricion: number;
  periodo: Database['public']['Enums']['tipo_nutricion_enum'];
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
};

export type AlimentoType = {
  alimento: {
    idPeriodo: number;
    nombre: string;
    medida: Medida;
    calorias: number;
    proteinas: number;
    carbohidratos: number;
    grasas: number;
  };
  cantidad: number;
};

export const Nutriciones: Record<number, NutricionType> = {
  1: {
    fecha: '2025-04-01',
    idUsuario: 'victorino_3c',
    macros: {
      Calorias: 1802,
      Proteinas: 80,
      Carbohidratos: 40,
      Grasas: 75,
    },
    Imagen: 'https://via.placeholder.com/150',
  },
  2: {
    fecha: '2025-02-09',
    idUsuario: 'victorino_3c',
    macros: {
      Calorias: 1230,
      Proteinas: 20,
      Carbohidratos: 30,
      Grasas: 45,
    },
    Imagen: 'https://via.placeholder.com/150',
  },
  // Añadir más ejercicios según sea necesario
  3: {
    fecha: '2025-01-09',
    idUsuario: 'victorino_3c',
    macros: {
      Calorias: 1802,
      Proteinas: 80,
      Grasas: 75,
      Carbohidratos: 40,
    },
    Imagen: 'https://via.placeholder.com/150',
  },
};

export const Periodos: Record<number, PeriodoType> = {
  1: {
    idNutricion: 1,
    periodo: TipoPeriodo.Desayuno,
    calorias: 500,
    proteinas: 20,
    carbohidratos: 30,
    grasas: 10,
  },
  2: {
    idNutricion: 1,
    periodo: TipoPeriodo.Comida,
    calorias: 800,
    proteinas: 40,
    carbohidratos: 40,
    grasas: 25,
  },
  3: {
    idNutricion: 1,
    periodo: TipoPeriodo.Cena,
    calorias: 500,
    proteinas: 20,
    carbohidratos: 30,
    grasas: 10,
  },
  4: {
    idNutricion: 1,
    periodo: TipoPeriodo.Snacks,
    calorias: 200,
    proteinas: 10,
    carbohidratos: 10,
    grasas: 10,
  },
  5: {
    idNutricion: 2,
    periodo: TipoPeriodo.Desayuno,
    calorias: 500,
    proteinas: 20,
    carbohidratos: 30,
    grasas: 10,
  },
  6: {
    idNutricion: 2,
    periodo: TipoPeriodo.Comida,
    calorias: 800,
    proteinas: 40,
    carbohidratos: 40,
    grasas: 25,
  },
  7: {
    idNutricion: 2,
    periodo: TipoPeriodo.Cena,
    calorias: 500,
    proteinas: 20,
    carbohidratos: 30,
    grasas: 10,
  },
  8: {
    idNutricion: 2,
    periodo: TipoPeriodo.Snacks,
    calorias: 200,
    proteinas: 10,
    carbohidratos: 10,
    grasas: 10,
  },
  // Añadir más ejercicios según sea necesario
};

export const Alimentos: Record<number, AlimentoType> = {
  1: {
    alimento: {
      idPeriodo: 1,
      nombre: 'Huevo',
      medida: Medida.unidades,
      calorias: 200,
      proteinas: 10,
      carbohidratos: 20,
      grasas: 5,
    },
    cantidad: 2,
  },
  2: {
    alimento: {
      idPeriodo: 1,
      nombre: 'Tostada',
      medida: Medida.unidades,
      calorias: 200,
      proteinas: 10,
      carbohidratos: 20,
      grasas: 5,
    },
    cantidad: 2,
  },
  3: {
    alimento: {
      idPeriodo: 2,
      nombre: 'Arroz',
      medida: Medida.gramos,
      calorias: 200,
      proteinas: 10,
      carbohidratos: 20,
      grasas: 5,
    },
    cantidad: 100,
  },
  4: {
    alimento: {
      idPeriodo: 2,
      nombre: 'Pollo',
      medida: Medida.gramos,
      calorias: 200,
      proteinas: 10,
      carbohidratos: 20,
      grasas: 5,
    },
    cantidad: 100,
  },
  5: {
    alimento: {
      idPeriodo: 3,
      nombre: 'Pasta',
      medida: Medida.gramos,
      calorias: 200,
      proteinas: 10,
      carbohidratos: 20,
      grasas: 5,
    },
    cantidad: 100,
  },
  6: {
    alimento: {
      idPeriodo: 3,
      nombre: 'Carne',
      medida: Medida.gramos,
      calorias: 200,
      proteinas: 10,
      carbohidratos: 20,
      grasas: 5,
    },
    cantidad: 100,
  },
  7: {
    alimento: {
      idPeriodo: 4,
      nombre: 'Yogur',
      medida: Medida.gramos,
      calorias: 200,
      proteinas: 10,
      carbohidratos: 20,
      grasas: 5,
    },
    cantidad: 200,
  },
  8: {
    alimento: {
      idPeriodo: 4,
      nombre: 'Fruta',
      medida: Medida.unidades,
      calorias: 200,
      proteinas: 10,
      carbohidratos: 20,
      grasas: 5,
    },
    cantidad: 1,
  },
  // Añadir más ejercicios según sea necesario
};

export const findNutricionByDate = (date: string): NutricionType | null => {
  for (const key in Nutriciones) {
    if (Nutriciones[key].fecha === date) {
      return Nutriciones[key];
    }
  }
  return null;
};

export const findPeriodosByNutricion = (idNutricion: number): PeriodoType[] => {
  const periodos: PeriodoType[] = [];
  for (const key in Periodos) {
    if (Periodos[key].idNutricion === idNutricion) {
      periodos.push(Periodos[key]);
    }
  }
  return periodos;
};

export const findAlimentosByPeriodo = (idPeriodo: number): AlimentoType[] => {
  const alimentos: AlimentoType[] = [];
  for (const key in Alimentos) {
    if (Alimentos[key].alimento.idPeriodo === idPeriodo) {
      alimentos.push(Alimentos[key]);
    }
  }
  return alimentos;
};

export const findNutricionIdByDate = (date: string): number | null => {
  for (const key in Nutriciones) {
    if (Nutriciones[key].fecha === date) {
      return parseInt(key);
    }
  }
  return null;
};

export const findPeriodoIdByNutricion = (
  idNutricion: number,
  periodo: TipoPeriodo
): number | null => {
  for (const key in Periodos) {
    if (Periodos[key].idNutricion === idNutricion && Periodos[key].periodo === periodo) {
      return parseInt(key);
    }
  }
  return null;
};

export const findAlimentoIdByPeriodo = (idPeriodo: number, nombre: string): number | null => {
  for (const key in Alimentos) {
    if (
      Alimentos[key].alimento.idPeriodo === idPeriodo &&
      Alimentos[key].alimento.nombre === nombre
    ) {
      return parseInt(key);
    }
  }
  return null;
};

export const findAlimentoById = (id: number): AlimentoType | null => {
  return Alimentos[id] || null;
};

export const findPeriodoById = (id: number): PeriodoType | null => {
  return Periodos[id] || null;
};

export const findNutricionById = (id: number): NutricionType | null => {
  return Nutriciones[id] || null;
};

export const getNutricionDatesByUser = (idUsuario: string): string[] => {
  const dates: string[] = [];
  for (const key in Nutriciones) {
    if (Nutriciones[key].idUsuario === idUsuario) {
      dates.push(Nutriciones[key].fecha);
    }
  }
  return dates;
};
