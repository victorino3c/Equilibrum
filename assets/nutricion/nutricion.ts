// ~/assets/ejercicio/ejercicio.ts

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

export type NutricionType = {
  fecha: string;
  idUsuario: string; //Temporal, esto deberia ser una relacion con la tabla de usuarios
  ObjetivoCalorias: number;
  Calorias: number;
  ObjetivoProteinas: number;
  Proteinas: number;
  ObjetivoGrasas: number;
  Grasas: number;
  ObjetivoCarbohidratos: number;
  Carbohidratos: number;
  Imagen?: string;
};

export type PeriodoType = {
  idNutricion: number;
  periodo: TipoPeriodo;
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
};

export type AlimentoType = {
  idPeriodo: number;
  nombre: string;
  cantidad: number | string;
  medida: Medida;
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
};

export const Nutriciones: Record<number, NutricionType> = {
  1: {
    fecha: '2025-01-25',
    idUsuario: 'victorino_3c',
    ObjetivoCalorias: 2200,
    Calorias: 1802,
    ObjetivoProteinas: 100,
    Proteinas: 80,
    ObjetivoGrasas: 102,
    Grasas: 75,
    ObjetivoCarbohidratos: 110,
    Carbohidratos: 40,
    Imagen: 'https://via.placeholder.com/150',
  },
  2: {
    fecha: '2025-01-07',
    idUsuario: 'victorino_3c',
    ObjetivoCalorias: 2200,
    Calorias: 1230,
    ObjetivoProteinas: 100,
    Proteinas: 20,
    ObjetivoGrasas: 102,
    Grasas: 45,
    ObjetivoCarbohidratos: 110,
    Carbohidratos: 30,
    Imagen: 'https://via.placeholder.com/150',
  },
  // Añadir más ejercicios según sea necesario
  3: {
    fecha: '2025-01-09',
    idUsuario: 'victorino_3c',
    ObjetivoCalorias: 2200,
    Calorias: 1802,
    ObjetivoProteinas: 100,
    Proteinas: 80,
    ObjetivoGrasas: 102,
    Grasas: 75,
    ObjetivoCarbohidratos: 110,
    Carbohidratos: 40,
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
    idPeriodo: 1,
    nombre: 'Leche',
    cantidad: 200,
    medida: Medida.mililitros,
    calorias: 100,
    proteinas: 10,
    carbohidratos: 10,
    grasas: 5,
  },
  2: {
    idPeriodo: 1,
    nombre: 'Cereal',
    cantidad: 50,
    medida: Medida.gramos,
    calorias: 200,
    proteinas: 10,
    carbohidratos: 20,
    grasas: 5,
  },
  3: {
    idPeriodo: 2,
    nombre: 'Arroz',
    cantidad: 100,
    medida: Medida.gramos,
    calorias: 200,
    proteinas: 10,
    carbohidratos: 20,
    grasas: 5,
  },
  4: {
    idPeriodo: 2,
    nombre: 'Pollo',
    cantidad: 100,
    medida: Medida.gramos,
    calorias: 200,
    proteinas: 10,
    carbohidratos: 20,
    grasas: 5,
  },
  5: {
    idPeriodo: 3,
    nombre: 'Pescado',
    cantidad: 100,
    medida: Medida.gramos,
    calorias: 200,
    proteinas: 10,
    carbohidratos: 20,
    grasas: 5,
  },
  6: {
    idPeriodo: 3,
    nombre: 'Ensalada',
    cantidad: 100,
    medida: Medida.gramos,
    calorias: 200,
    proteinas: 10,
    carbohidratos: 20,
    grasas: 5,
  },
  7: {
    idPeriodo: 4,
    nombre: 'Yogurt',
    cantidad: 200,
    medida: Medida.mililitros,
    calorias: 100,
    proteinas: 10,
    carbohidratos: 10,
    grasas: 5,
  },
  8: {
    idPeriodo: 4,
    nombre: 'Fruta',
    cantidad: 'Mediano',
    medida: Medida.tamaño,
    calorias: 100,
    proteinas: 10,
    carbohidratos: 10,
    grasas: 5,
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
    if (Alimentos[key].idPeriodo === idPeriodo) {
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
    if (Alimentos[key].idPeriodo === idPeriodo && Alimentos[key].nombre === nombre) {
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
