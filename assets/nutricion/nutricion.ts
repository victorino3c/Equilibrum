// ~/assets/ejercicio/ejercicio.ts
export type NutricionType = {
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

export const Nutriciones: Record<string, NutricionType> = {
  '2024-12-26': {
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
  '2024-12-27': {
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
};
