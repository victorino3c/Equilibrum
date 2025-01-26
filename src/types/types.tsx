import { Data } from 'react-native-timeline-flatlist';
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
  SeriesCardio: Database['public']['Tables']['series_cardio']['Row'][];
  SeriesFuerza: Database['public']['Tables']['series_fuerza']['Row'][];
  SeriesCalistenia: Database['public']['Tables']['series_calistenia']['Row'][];
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

export type SerieCardioType = Database['public']['Tables']['series_cardio']['Row'];

export type SerieFuerzaType = Database['public']['Tables']['series_fuerza']['Row'];

export type SerieCalisteniaType = Database['public']['Tables']['series_calistenia']['Row'];
