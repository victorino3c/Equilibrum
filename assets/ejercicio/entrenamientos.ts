// ~/assets/ejercicio/ejercicio.ts
export type EntrenamientosType = {
  Nombre: string;
  Descripcion: string;
  Imagen: string | null;
  Sensacion: number;
  Numero: string;
  Calorias: number;
  Duracion: string;
  Series: number;
  Volumen: number;
};

export const Entrenamientos: Record<string, EntrenamientosType> = {
  '2024-12-26': {
    Nombre: 'Pecho/Triceps',
    Descripcion: 'Duro',
    Imagen: null,
    Sensacion: 4,
    Numero: '12',
    Calorias: 512,
    Duracion: '2:13',
    Series: 24,
    Volumen: 11560,
  },
  '2024-12-27': {
    Nombre: 'Pecho/Triceps',
    Descripcion: 'Duro de pilotes',
    Imagen: 'null',
    Sensacion: 4,
    Numero: '12',
    Calorias: 512,
    Duracion: '2:13',
    Series: 24,
    Volumen: 11560,
  },
  // Añadir más ejercicios según sea necesario
};
