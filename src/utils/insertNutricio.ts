import { useInsertNutricion, useInsertAlimento } from '@api/nutricion';
import { Database } from '~/src/database.types';
export const useInsertNutricio = (queryClient: any) => {
  const insertNutricion = useInsertNutricion(queryClient);
  const insertAlimento = useInsertAlimento(queryClient);

  //TEMP: Nutricion se está subiendo correctamente, pero por algún motivo los alimentos no, ver por que
  const insertNutricio = async ({
    user_id,
    periodos_store,
    storedDate,
    today,
  }: {
    user_id: string;
    periodos_store: any;
    storedDate: string;
    today: string;
  }) => {
    //if (storedDate === today) {
    //  console.log('La fecha almacenada es la misma que la de hoy. No se hace nada.');
    //  return;
    //}

    // Insert nutrition data
    for (const periodo of ['Desayuno', 'Comida', 'Cena', 'Snacks']) {
      const macros = periodos_store[periodo]?.macros || {};
      insertNutricion.mutate(
        {
          user_id,
          tipo_nutricion: periodo as Database['public']['Enums']['tipo_nutricion_enum'],
          calorias: macros.Calorias || 0,
          proteina: macros.Proteinas || 0,
          carbohidratos: macros.Carbohidratos || 0,
          grasa: macros.Grasas || 0,
          fecha: storedDate,
        },
        {
          onError: (error) => {
            console.log(error);
            return;
          },
        }
      );
    }

    // Insert alimentos data
    for (const periodo in periodos_store) {
      const alimentos = periodos_store[periodo]?.alimentos || [];
      for (const alimento of alimentos) {
        insertAlimento.mutate({
          user_id,
          tipo_nutricion: periodo as Database['public']['Enums']['tipo_nutricion_enum'],
          id_alimento: alimento.alimento.id,
          cantidad: alimento.cantidad,
          fecha_nutricion: storedDate,
        });
      }
    }
  };

  return { insertNutricio };
};
