// ~/assets/ejercicio/ejercicio.ts
export type EntrenamientosType = {
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

export type RutinaType = {
  id: number;
  idUsuario: string;
  Nombre: string;
  Ejercicios: number[];
};

export type EjercicioType = {
  id: number;
  tipo: TipoEjercicio;
  Nombre: string;
  Descripcion?: string;
  Descanso: string;
  CaloriasxRepeticion?: number;
};

export type SerieCardioType = {
  idEntrenamiento: number;
  idEjercicio: number;
  Distancia: number;
  Tiempo: string;
  Calorias: number;
};

export type SerieFuerzaType = {
  idEntrenamiento: number;
  idEjercicio: number;
  Repeticiones: number;
  Peso: number;
};

export type SerieCalisteniaType = {
  idEntrenamiento: number;
  idEjercicio: number;
  Repeticiones: number;
};

export type SerieRutinaCardioType = {
  idRutina: number;
  idEjercicio: number;
  Distancia: number;
  Tiempo: string;
  Calorias: number;
};

export type SerieRutinaFuerzaType = {
  idRutina: number;
  idEjercicio: number;
  Repeticiones: number;
  Peso: number;
};

export type SerieRutinaCalisteniaType = {
  idRutina: number;
  idEjercicio: number;
  Repeticiones: number;
};

export enum TipoEjercicio {
  Cardio = 'Cardio',
  Fuerza = 'Fuerza',
  Calistenia = 'Calistenia',
}

export const Entrenamientos: Record<number, EntrenamientosType> = {
  1: {
    fecha: '2024-12-26',
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
    fecha: '2024-12-27',
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
    fecha: '2024-12-28',
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

export const Rutinas: Record<number, RutinaType> = {
  1: {
    id: 1,
    idUsuario: 'victorino_3c',
    Nombre: 'Pecho/Triceps',
    Ejercicios: [3, 4, 5],
  },

  2: {
    id: 2,
    idUsuario: 'victorino_3c',
    Nombre: 'Espalda/Biceps',
    Ejercicios: [1, 6],
  },
  // Añadir más rutinas según sea necesario
};

export const Ejercicios: Record<number, EjercicioType> = {
  1: {
    id: 1,
    tipo: TipoEjercicio.Cardio,
    Nombre: 'Cinta',
    Descripcion: 'Correr',
    Descanso: '1:30',
    CaloriasxRepeticion: 4,
  },
  2: {
    id: 2,
    tipo: TipoEjercicio.Cardio,
    Nombre: 'Bicicleta',
    Descripcion: 'Pedaleo',
    Descanso: '1:30',
    CaloriasxRepeticion: 3,
  },
  3: {
    id: 3,
    tipo: TipoEjercicio.Fuerza,
    Nombre: 'Press Banca',
    Descripcion: 'Empujar',
    Descanso: '1:30',
    CaloriasxRepeticion: 2,
  },
  4: {
    id: 4,
    tipo: TipoEjercicio.Fuerza,
    Nombre: 'Press Militar',
    Descripcion: 'Empujar',
    Descanso: '1:30',
    CaloriasxRepeticion: 2,
  },
  5: {
    id: 5,
    tipo: TipoEjercicio.Calistenia,
    Nombre: 'Flexiones',
    Descripcion: 'Empujar',
    Descanso: '1:30',
    CaloriasxRepeticion: 1.5,
  },
  6: {
    id: 6,
    tipo: TipoEjercicio.Calistenia,
    Nombre: 'Dominadas',
    Descripcion: 'Tirar',
    Descanso: '1:30',
    CaloriasxRepeticion: 1.5,
  },
};

export const SeriesCardio: Record<number, SerieCardioType> = {
  1: {
    idEntrenamiento: 1,
    idEjercicio: 1,
    Distancia: 5,
    Tiempo: '30:00',
    Calorias: 250,
  },
  2: {
    idEntrenamiento: 1,
    idEjercicio: 2,
    Distancia: 5,
    Tiempo: '30:00',
    Calorias: 250,
  },
};

export const SeriesFuerza: Record<number, SerieFuerzaType> = {
  1: {
    idEntrenamiento: 1,
    idEjercicio: 3,
    Repeticiones: 12,
    Peso: 50,
  },
  2: {
    idEntrenamiento: 1,
    idEjercicio: 3,
    Repeticiones: 12,
    Peso: 50,
  },
  3: {
    idEntrenamiento: 1,
    idEjercicio: 4,
    Repeticiones: 12,
    Peso: 50,
  },
};

export const SeriesCalistenia: Record<number, SerieCalisteniaType> = {
  1: {
    idEntrenamiento: 1,
    idEjercicio: 5,
    Repeticiones: 12,
  },
  2: {
    idEntrenamiento: 1,
    idEjercicio: 6,
    Repeticiones: 12,
  },
  3: {
    idEntrenamiento: 1,
    idEjercicio: 5,
    Repeticiones: 12,
  },
};

export const SeriesRutinaCardio: Record<number, SerieRutinaCardioType> = {
  1: {
    idRutina: 2,
    idEjercicio: 1,
    Distancia: 5,
    Tiempo: '30:00',
    Calorias: 250,
  },
};

export const SeriesRutinaFuerza: Record<number, SerieRutinaFuerzaType> = {
  1: {
    idRutina: 1,
    idEjercicio: 3,
    Repeticiones: 12,
    Peso: 50,
  },
  2: {
    idRutina: 1,
    idEjercicio: 4,
    Repeticiones: 12,
    Peso: 50,
  },
  3: {
    idRutina: 1,
    idEjercicio: 4,
    Repeticiones: 12,
    Peso: 50,
  },
  4: {
    idRutina: 1,
    idEjercicio: 4,
    Repeticiones: 12,
    Peso: 50,
  },
};

export const SeriesRutinaCalistenia: Record<number, SerieRutinaCalisteniaType> = {
  1: {
    idRutina: 1,
    idEjercicio: 5,
    Repeticiones: 12,
  },
  2: {
    idRutina: 1,
    idEjercicio: 6,
    Repeticiones: 12,
  },
  3: {
    idRutina: 2,
    idEjercicio: 6,
    Repeticiones: 12,
  },
  4: {
    idRutina: 2,
    idEjercicio: 6,
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

export const findEjercicioById = (id: number): EjercicioType | null => {
  return Ejercicios[id] || null;
};

export const findSeriesCardioByEntrenamientoAndEjercicio = (
  idEntrenamiento: number,
  idEjercicio: number
): SerieCardioType[] => {
  const series: SerieCardioType[] = [];
  for (const key in SeriesCardio) {
    if (
      SeriesCardio[key].idEntrenamiento === idEntrenamiento &&
      SeriesCardio[key].idEjercicio === idEjercicio
    ) {
      series.push(SeriesCardio[key]);
    }
  }
  return series;
};

export const findSeriesFuerzaByEntrenamientoAndEjercicio = (
  idEntrenamiento: number,
  idEjercicio: number
): SerieFuerzaType[] => {
  const series: SerieFuerzaType[] = [];
  for (const key in SeriesFuerza) {
    if (
      SeriesFuerza[key].idEntrenamiento === idEntrenamiento &&
      SeriesFuerza[key].idEjercicio === idEjercicio
    ) {
      series.push(SeriesFuerza[key]);
    }
  }
  return series;
};

export const findSeriesCalisteniaByEntrenamientoAndEjercicio = (
  idEntrenamiento: number,
  idEjercicio: number
): SerieCalisteniaType[] => {
  const series: SerieCalisteniaType[] = [];
  for (const key in SeriesCalistenia) {
    if (
      SeriesCalistenia[key].idEntrenamiento === idEntrenamiento &&
      SeriesCalistenia[key].idEjercicio === idEjercicio
    ) {
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
      const ejercicio = findEjercicioById(id);
      if (ejercicio) {
        ejercicios.push(ejercicio);
      }
    });
  }
  return ejercicios;
};

export const findSeriesByEjercicioAndEntrenamiento = (
  idEjercicio: number,
  idEntrenamiento: number
): any[] => {
  const series: any[] = [];
  const tipo = findEjercicioById(idEjercicio)?.tipo;
  if (tipo === TipoEjercicio.Cardio) {
    series.push(...findSeriesCardioByEntrenamientoAndEjercicio(idEntrenamiento, idEjercicio));
  } else if (tipo === TipoEjercicio.Fuerza) {
    series.push(...findSeriesFuerzaByEntrenamientoAndEjercicio(idEntrenamiento, idEjercicio));
  } else if (tipo === TipoEjercicio.Calistenia) {
    series.push(...findSeriesCalisteniaByEntrenamientoAndEjercicio(idEntrenamiento, idEjercicio));
  }
  return series;
};

export const getNumeroSeriesByEjercicioAndEntrenamiento = (
  idEjercicio: number,
  idEntrenamiento: number
): number => {
  // Get the number of series for the exercise in the training
  const series = findSeriesByEjercicioAndEntrenamiento(idEjercicio, idEntrenamiento);
  return series.length;
};

export const getVolumenByEjercicioAndEntrenamiento = (
  idEjercicio: number,
  idEntrenamiento: number
): number => {
  // Get the volume for the exercise in the training
  const series = findSeriesByEjercicioAndEntrenamiento(idEjercicio, idEntrenamiento);
  let volumen = 0;
  series.forEach((serie) => {
    if (serie.Peso) {
      volumen += serie.Repeticiones * serie.Peso;
    }
  });
  return volumen;
};

export const getRepeticionesByEjercicioAndEntrenamiento = (
  idEjercicio: number,
  idEntrenamiento: number
): number => {
  // Get the number of reps for the exercise in the training
  const series = findSeriesByEjercicioAndEntrenamiento(idEjercicio, idEntrenamiento);
  let repeticiones = 0;
  series.forEach((serie) => {
    repeticiones += serie.Repeticiones;
  });
  return repeticiones;
};

export const getCaloriasByEjercicioAndEntrenamiento = (
  idEjercicio: number,
  idEntrenamiento: number
): number => {
  const ejercicio = findEjercicioById(idEjercicio);

  if (ejercicio?.tipo === TipoEjercicio.Cardio) {
    // Get the distance for the exercise in the training and multiply by the calories per km
    const series = findSeriesCardioByEntrenamientoAndEjercicio(idEntrenamiento, idEjercicio);
    const caloriasPorKm = findEjercicioById(idEjercicio)?.CaloriasxRepeticion;

    return series.reduce((calorias, serie) => calorias + serie.Distancia * (caloriasPorKm || 0), 0);
  }

  // Get the number of reps for the exercise in the training and multiply by the calories per rep
  const repeticiones = getRepeticionesByEjercicioAndEntrenamiento(idEjercicio, idEntrenamiento);
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

export const getRutinasByUser = (idUsuario: string): RutinaType[] => {
  // Get the routines for the user
  const rutinas: RutinaType[] = [];
  for (const key in Rutinas) {
    if (Rutinas[key].idUsuario === idUsuario) {
      rutinas.push(Rutinas[key]);
    }
  }
  return rutinas;
};

export const getEjerciciosByRutina = (idRutina: number): EjercicioType[] => {
  // Get the exercises for the routine
  const ejercicios: EjercicioType[] = [];
  const ejerciciosId = Rutinas[idRutina].Ejercicios;
  if (ejerciciosId) {
    ejerciciosId.forEach((id) => {
      const ejercicio = findEjercicioById(id);
      if (ejercicio) {
        ejercicios.push(ejercicio);
      }
    });
  }
  return ejercicios;
};

export const getEjerciciosByRutinaAndUser = (
  nombreRutina: string,
  idUsuario: string
): EjercicioType[] => {
  // Get the exercises for the routine
  const rutina = getRutinasByUser(idUsuario).find((rutina) => rutina.Nombre === nombreRutina);
  if (rutina) {
    return getEjerciciosByRutina(rutina.id);
  }
  return [];
};

export const getRutinaIdByNombre = (nombreRutina: string): number | null => {
  // Get the routine id by name
  for (const key in Rutinas) {
    if (Rutinas[key].Nombre === nombreRutina) {
      return parseInt(key);
    }
  }
  return null;
};

export const getSeriesRutinaCardioByRutinaAndEjercicio = (
  idRutina: number,
  idEjercicio: number
): SerieRutinaCardioType[] => {
  const series: SerieRutinaCardioType[] = [];
  for (const key in SeriesRutinaCardio) {
    if (
      SeriesRutinaCardio[key].idRutina === idRutina &&
      SeriesRutinaCardio[key].idEjercicio === idEjercicio
    ) {
      series.push(SeriesRutinaCardio[key]);
    }
  }
  return series;
};

export const getSeriesRutinaFuerzaByRutinaAndEjercicio = (
  idRutina: number,
  idEjercicio: number
): SerieRutinaFuerzaType[] => {
  const series: SerieRutinaFuerzaType[] = [];
  for (const key in SeriesRutinaFuerza) {
    if (
      SeriesRutinaFuerza[key].idRutina === idRutina &&
      SeriesRutinaFuerza[key].idEjercicio === idEjercicio
    ) {
      series.push(SeriesRutinaFuerza[key]);
    }
  }
  return series;
};

export const getSeriesRutinaCalisteniaByRutinaAndEjercicio = (
  idRutina: number,
  idEjercicio: number
): SerieRutinaCalisteniaType[] => {
  const series: SerieRutinaCalisteniaType[] = [];
  for (const key in SeriesRutinaCalistenia) {
    if (
      SeriesRutinaCalistenia[key].idRutina === idRutina &&
      SeriesRutinaCalistenia[key].idEjercicio === idEjercicio
    ) {
      series.push(SeriesRutinaCalistenia[key]);
    }
  }
  return series;
};
