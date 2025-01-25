import {
  EjercicioType,
  SerieCalisteniaType,
  SerieCardioType,
  SerieFuerzaType,
  TipoEjercicio,
} from '~/src/types/types';

// ~/assets/ejercicio/ejercicio.ts
export type EntrenamientosType = {
  id: number;
  fecha: string;
  idUsuario: string; //Temporal, esto deberia ser una relacion con la tabla de usuarios
  Nombre: string;
  Descripcion?: string;
  Imagen: string | null;
  Sensacion?: number;
  Numero: string;
  Ejericios?: number[];
  Calorias: number;
  Duracion: string;
  Series: number;
  Volumen: number;
};

export const Entrenamientos: Record<number, EntrenamientosType> = {
  1: {
    id: 1,
    fecha: '2025-01-06',
    idUsuario: 'victorino_3c',
    Nombre: 'Pecho/Triceps',
    Descripcion:
      'Aqui van los comentarios del entrenamiento. Desde como me senti, hasta si me dolio algo.',
    Imagen: null,
    Sensacion: 4,
    Numero: '12',
    Ejericios: [1, 2, 3, 4, 5, 6],
    Calorias: 512,
    Duracion: '2:13',
    Series: 24,
    Volumen: 11560,
  },
  2: {
    id: 2,
    fecha: '2025-01-07',
    idUsuario: 'victorino_3c',
    Nombre: 'Pecho/Triceps',
    //Descripcion: 'Duro de pilotes',
    Imagen: 'null',
    Sensacion: 4,
    Numero: '13',
    Calorias: 512,
    Duracion: '2:13',
    Series: 24,
    Volumen: 11560,
  },
  3: {
    id: 3,
    fecha: '2025-01-08',
    idUsuario: 'victorino_3c',
    Nombre: 'Pecho/Triceps',
    //Descripcion: 'Duro de pilotes',
    Imagen: 'null',
    Sensacion: 4,
    Numero: '142',
    Calorias: 212,
    Duracion: '2:13',
    Series: 24,
    Volumen: 11560,
  },

  // Añadir más ejercicios según sea necesario
};

export const Ejercicios: Record<number, EjercicioType> = {
  1: {
    id: '1',
    tipo: TipoEjercicio.Cardio,
    Nombre: 'Cinta',
    Descripcion: 'Correr',
    Descanso: '1:30',
    CaloriasxRepeticion: 4,
    Musculos: ['Piernas', 'Gluteos'],
  },
  2: {
    id: '2',
    tipo: TipoEjercicio.Cardio,
    Nombre: 'Bicicleta',
    Descripcion: 'Pedaleo',
    Descanso: '1:30',
    CaloriasxRepeticion: 3,
    Musculos: ['Piernas', 'Gluteos'],
  },
  3: {
    id: '3',
    tipo: TipoEjercicio.Fuerza,
    Nombre: 'Press Banca',
    Descripcion: 'Empujar',
    Descanso: '1:30',
    CaloriasxRepeticion: 2,
    Musculos: ['Pecho', 'Triceps'],
  },
  4: {
    id: '4',
    tipo: TipoEjercicio.Fuerza,
    Nombre: 'Press Militar',
    Descripcion: 'Empujar',
    Descanso: '1:30',
    CaloriasxRepeticion: 2,
    Musculos: ['Hombros', 'Triceps'],
  },
  5: {
    id: '5',
    tipo: TipoEjercicio.Calistenia,
    Nombre: 'Flexiones',
    Descripcion: 'Empujar',
    Descanso: '1:30',
    CaloriasxRepeticion: 1.5,
    Musculos: ['Pecho', 'Triceps'],
  },
  6: {
    id: '6',
    tipo: TipoEjercicio.Calistenia,
    Nombre: 'Dominadas',
    Descripcion: 'Tirar',
    Descanso: '1:30',
    CaloriasxRepeticion: 1.5,
    Musculos: ['Espalda', 'Biceps'],
  },
  7: {
    id: '7',
    tipo: TipoEjercicio.Cardio,
    Nombre: 'Cinta',
    Descripcion: 'Correr',
    Descanso: '1:30',
    CaloriasxRepeticion: 4,
    Musculos: ['Piernas', 'Gluteos'],
  },
  8: {
    id: '8',
    tipo: TipoEjercicio.Cardio,
    Nombre: 'Bicicleta',
    Descripcion: 'Pedaleo',
    Descanso: '1:30',
    CaloriasxRepeticion: 3,
    Musculos: ['Piernas', 'Gluteos'],
  },
  9: {
    id: '9',
    tipo: TipoEjercicio.Fuerza,
    Nombre: 'Press Banca',
    Descripcion: 'Empujar',
    Descanso: '1:30',
    CaloriasxRepeticion: 2,
    Musculos: ['Pecho', 'Triceps'],
  },
  10: {
    id: '10',
    tipo: TipoEjercicio.Fuerza,
    Nombre: 'Press Militar',
    Descripcion: 'Empujar',
    Descanso: '1:30',
    CaloriasxRepeticion: 2,
    Musculos: ['Hombros', 'Triceps'],
  },
  11: {
    id: '11',
    tipo: TipoEjercicio.Calistenia,
    Nombre: 'Flexiones',
    Descripcion: 'Empujar',
    Descanso: '1:30',
    CaloriasxRepeticion: 1.5,
    Musculos: ['Pecho', 'Triceps'],
  },
  12: {
    id: '12',
    tipo: TipoEjercicio.Calistenia,
    Nombre: 'Dominadas',
    Descripcion: 'Tirar',
    Descanso: '1:30',
    CaloriasxRepeticion: 1.5,
    Musculos: ['Espalda', 'Biceps'],
  },
  // Añadir más ejercicios según sea necesario
};

export const SeriesCardio: Record<number, SerieCardioType> = {
  1: {
    id: '1',
    //idEntrenamiento: 1,
    idEjercicio: '1',
    check: true,
    Distancia: 5,
    Tiempo: '30:00',
    Calorias: 250,
  },
  2: {
    id: '2',
    //idEntrenamiento: 1,
    idEjercicio: '2',
    check: true,
    Distancia: 5,
    Tiempo: '30:00',
    Calorias: 250,
  },
};

export const SeriesFuerza: Record<number, SerieFuerzaType> = {
  1: {
    id: '1',
    //idEntrenamiento: 1,
    idEjercicio: '3',
    check: true,
    Repeticiones: 12,
    Peso: 50,
  },
  2: {
    id: '2',
    //idEntrenamiento: 1,
    idEjercicio: '3',
    check: true,
    Repeticiones: 12,
    Peso: 50,
  },
  3: {
    id: '3',
    //idEntrenamiento: 1,
    idEjercicio: '4',
    check: true,
    Repeticiones: 12,
    Peso: 50,
  },
};

export const SeriesCalistenia: Record<number, SerieCalisteniaType> = {
  1: {
    id: '1',
    //idEntrenamiento: 1,
    idEjercicio: '5',
    check: true,
    Repeticiones: 12,
  },
  2: {
    id: '2',
    //idEntrenamiento: 1,
    idEjercicio: '6',
    check: true,
    Repeticiones: 12,
  },
  3: {
    id: '3',
    //idEntrenamiento: 1,
    idEjercicio: '5',
    check: true,
    Repeticiones: 12,
  },
};

export const findEntrenamientoById = (id: number): EntrenamientosType | null => {
  return Entrenamientos[id] || null;
};

export const findEntrenamientoByDate = (fecha: string): EntrenamientosType | null => {
  // Iterate over the Entrenamientos object and find the one with the matching date
  for (const key in Entrenamientos) {
    if (Entrenamientos[key].fecha === fecha) {
      return Entrenamientos[key];
    }
  }
  // Return undefined if no matching entry is found
  return null;
};

export const findEntrenamientoIdByDate = (fecha: string): number | null => {
  // Iterate over the Entrenamientos object and find the one with the matching date
  for (const key in Entrenamientos) {
    if (Entrenamientos[key].fecha === fecha) {
      return parseInt(key);
    }
  }
  // Return undefined if no matching entry is found
  return null;
};

export const findEjercicioById = (id: string): EjercicioType | null => {
  return Ejercicios[parseInt(id)] || null;
};

export const findSeriesCardioByEjercicio = (idEjercicio: string): SerieCardioType[] => {
  const series: SerieCardioType[] = [];
  for (const key in SeriesCardio) {
    if (SeriesCardio[key].idEjercicio === idEjercicio) {
      series.push(SeriesCardio[key]);
    }
  }
  return series;
};

export const findSeriesFuerzaByEjercicio = (idEjercicio: string): SerieFuerzaType[] => {
  const series: SerieFuerzaType[] = [];
  for (const key in SeriesFuerza) {
    if (SeriesFuerza[key].idEjercicio === idEjercicio) {
      series.push(SeriesFuerza[key]);
    }
  }
  return series;
};

export const findSeriesCalisteniaByEjercicio = (idEjercicio: string): SerieCalisteniaType[] => {
  const series: SerieCalisteniaType[] = [];
  for (const key in SeriesCalistenia) {
    if (SeriesCalistenia[key].idEjercicio === idEjercicio) {
      series.push(SeriesCalistenia[key]);
    }
  }
  return series;
};

export const findEjerciciosByEntrenamiento = (idEntrenamiento: number): EjercicioType[] => {
  const ejercicios: EjercicioType[] = [];
  const ejerciciosId = Entrenamientos[idEntrenamiento].Ejericios;
  if (ejerciciosId) {
    ejerciciosId.forEach((id) => {
      const ejercicio = findEjercicioById(id.toString());
      if (ejercicio) {
        ejercicios.push(ejercicio);
      }
    });
  }
  return ejercicios;
};

export const findSeriesByEjercicio = (idEjercicio: string): any[] => {
  const series: any[] = [];
  const tipo = findEjercicioById(idEjercicio)?.tipo;
  if (tipo === TipoEjercicio.Cardio) {
    series.push(...findSeriesCardioByEjercicio(idEjercicio));
  } else if (tipo === TipoEjercicio.Fuerza) {
    series.push(...findSeriesFuerzaByEjercicio(idEjercicio));
  } else if (tipo === TipoEjercicio.Calistenia) {
    series.push(...findSeriesCalisteniaByEjercicio(idEjercicio));
  }
  return series;
};

export const getNumeroSeriesByEjercicio = (idEjercicio: string): number => {
  // Get the number of series for the exercise in the training
  const series = findSeriesByEjercicio(idEjercicio);
  return series.length;
};

export const getVolumenByEjercicio = (idEjercicio: string): number => {
  // Get the volume for the exercise in the training
  const series = findSeriesByEjercicio(idEjercicio);
  let volumen = 0;
  series.forEach((serie) => {
    if (serie.Peso) {
      volumen += serie.Repeticiones * serie.Peso;
    }
  });
  return volumen;
};

export const getRepeticionesByEjercicio = (idEjercicio: string): number => {
  // Get the number of reps for the exercise in the training
  const series = findSeriesByEjercicio(idEjercicio);
  let repeticiones = 0;
  series.forEach((serie) => {
    repeticiones += serie.Repeticiones;
  });
  return repeticiones;
};

export const getCaloriasByEjercicio = (idEjercicio: string): number => {
  const ejercicio = findEjercicioById(idEjercicio);

  if (ejercicio?.tipo === TipoEjercicio.Cardio) {
    // Get the distance for the exercise in the training and multiply by the calories per km
    const series = findSeriesCardioByEjercicio(idEjercicio);
    const caloriasPorKm = findEjercicioById(idEjercicio)?.CaloriasxRepeticion;

    return series.reduce(
      (calorias, serie) =>
        calorias + (serie.Distancia ? serie.Distancia * (caloriasPorKm || 0) : 0),
      0
    );
  }

  // Get the number of reps for the exercise in the training and multiply by the calories per rep
  const repeticiones = getRepeticionesByEjercicio(idEjercicio);
  const caloriasPorRepeticion = findEjercicioById(idEjercicio)?.CaloriasxRepeticion;

  return repeticiones * (caloriasPorRepeticion || 0);
};

export const getEntrenamientoDatesByUser = (idUsuario: string): string[] => {
  // Get the dates of the trainings for the user
  const dates: string[] = [];
  for (const key in Entrenamientos) {
    if (Entrenamientos[key].idUsuario === idUsuario) {
      dates.push(Entrenamientos[key].fecha);
    }
  }
  return dates;
};

// Export the ejericios object as an array
export const ejerciciosArray = Object.values(Ejercicios);
