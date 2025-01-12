export enum TipoEjercicio {
  Cardio = 'Cardio',
  Fuerza = 'Fuerza',
  Calistenia = 'Calistenia',
}

export type RutinaType = {
  Nombre: string;
  Ejercicios: EjercicioType[];
  SeriesCardio: SerieCardioType[];
  SeriesFuerza: SerieFuerzaType[];
  SeriesCalistenia: SerieCalisteniaType[];
};

export type EjercicioType = {
  id: number;
  tipo: TipoEjercicio;
  Nombre: string;
  Descripcion?: string;
  Descanso: string;
  CaloriasxRepeticion?: number;
  Musculos?: string[];
};

export type SerieCardioType = {
  id: number;
  idEntrenamiento?: number;
  idEjercicio: number;
  check: boolean;
  Distancia?: number;
  Tiempo?: string;
  Calorias?: number;
};

export type SerieFuerzaType = {
  id: number;
  idEntrenamiento?: number;
  idEjercicio: number;
  check: boolean;
  Repeticiones?: number;
  Peso?: number;
};

export type SerieCalisteniaType = {
  id: number;
  idEntrenamiento?: number;
  idEjercicio: number;
  check: boolean;
  Repeticiones?: number;
};
