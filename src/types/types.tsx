import { Database } from '~/src/database.types';

export enum TipoEjercicio {
  Cardio = 'Cardio',
  Fuerza = 'Fuerza',
  Calistenia = 'Calistenia',
}

export enum Generos {
  Masculino = 'Masculino',
  Femenino = 'Femenino',
}

export enum Peso {
  Kilgramos = 'Kg',
  Libras = 'Lb',
}

export enum Distancia {
  Kilometros = 'Km',
  Millas = 'Mi',
}

export type RutinaType = {
  Nombre: string;
  Ejercicios: Database['public']['Tables']['ejercicios']['Row'][];
  SeriesCardio: SerieCardioType[];
  SeriesFuerza: SerieFuerzaType[];
  SeriesCalistenia: SerieCalisteniaType[];
};

export type EjercicioType = {
  id: string;
  tipo: TipoEjercicio;
  Nombre: string;
  Descripcion?: string;
  Descanso: string;
  CaloriasxRepeticion?: number;
  Musculos?: string[];
};

export type SerieCardioType = {
  id?: string;
  //idEntrenamiento?: string;
  idEjercicio: string;
  check: boolean;
  Distancia?: number;
  Tiempo?: string;
  Calorias?: number;
};

export type SerieFuerzaType = {
  id?: string;
  //idEntrenamiento?: number;
  idEjercicio: string;
  check: boolean;
  Repeticiones?: number;
  Peso?: number;
};

export type SerieCalisteniaType = {
  id?: string;
  //idEntrenamiento?: number;
  idEjercicio: string;
  check: boolean;
  Repeticiones?: number;
};
