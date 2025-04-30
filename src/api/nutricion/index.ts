import { supabase } from '@libs/supabase';
import { useAuth } from '@providers/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Database } from '~/src/database.types';

export const useGetUserNutriciones = () => {
  const { session } = useAuth();
  const userId = session?.user.id;

  return useQuery({
    queryKey: ['nutriciones', userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error('No user id');
      }

      const { data, error } = await supabase.from('nutricion').select().eq('user_id', userId);

      if (error) throw new Error(error.message);

      return data;
    },
    enabled: !!userId,
  });
};

export const useGetNutricionesOfDate = (date: string) => {
  const { session } = useAuth();
  const userId = session?.user.id;

  return useQuery({
    queryKey: ['nutriciones', userId, date],
    queryFn: async () => {
      if (!userId) {
        throw new Error('No user id');
      }

      const { data, error } = await supabase
        .from('nutricion')
        .select()
        .eq('user_id', userId)
        .eq('fecha', date);

      if (error) throw new Error(error.message);

      return data;
    },
    enabled: !!userId,
  });
};

export const useGetAlimentos = () => {
  //const { session } = useAuth();
  //const userId = session?.user.id;

  return useQuery({
    queryKey: ['alimentos'],
    queryFn: async () => {
      const { data, error } = await supabase.from('alimento').select();

      if (error) throw new Error(error.message);

      return data;
    },
  });
};

export const getAlimentosByPeriodo = (periodo: string, fecha: string, user_id: string) => {
  return useQuery({
    queryKey: ['nutricion_alimento', periodo, fecha, user_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('nutricion_alimento')
        .select()
        .eq('user_id', user_id)
        .eq('fecha_nutricion', fecha)
        .eq('tipo_nutricion', periodo);

      if (error) throw new Error(error.message);

      if (!data) {
        throw new Error('No data');
      }

      // Get the alimentos from alimento that are in the list of alimentos_nutricion
      const alimentoIds = data.map((alimento) => alimento.id_alimento);
      if (alimentoIds.length === 0) return [];
      const { data: alimentos, error: errorAlimentos } = await supabase
        .from('alimento')
        .select()
        .in('id', alimentoIds);
      if (errorAlimentos) throw new Error(errorAlimentos.message);
      // Return the alimentos and the cantidad from alimentos_nutricion
      const alimentosWithCantidad = alimentos.map((alimento) => {
        const alimentoNutricion = data.find((a) => a.id_alimento === alimento.id);
        return {
          ...alimento,
          cantidad: alimentoNutricion ? alimentoNutricion.cantidad : 0,
        };
      });
      return alimentosWithCantidad;
    },
  });
};

// Hook personalizado para insertar una nutricion
export const useInsertNutricion = (queryClient: any) => {
  return useMutation({
    async mutationFn({
      tipo_nutricion,
      user_id,
      calorias,
      proteina,
      carbohidratos,
      grasa,
      fecha,
    }: Database['public']['Tables']['nutricion']['Insert']) {
      if (!user_id) {
        throw new Error('No user id');
      }

      const { data, error } = await supabase
        .from('nutricion')
        .upsert([
          { user_id: user_id, calorias, proteina, carbohidratos, grasa, tipo_nutricion, fecha },
        ])
        .select()
        .single();

      if (error) throw new Error(error.message);

      return data;
    },
    onSuccess: ({ fecha, user_id }) => {
      queryClient.invalidateQueries({ queryKey: ['nutricion', fecha, user_id] });
    },
  });
};

// Hook personalizado para insertar un alimento en una nutricion
export const useInsertAlimento = (queryclient: any) => {
  return useMutation({
    async mutationFn({
      user_id,
      id_alimento,
      cantidad,
      fecha_nutricion,
      tipo_nutricion,
    }: Database['public']['Tables']['nutricion_alimento']['Insert']) {
      if (!user_id) {
        throw new Error('No user id');
      }

      const { data, error } = await supabase
        .from('nutricion_alimento')
        .upsert([{ user_id: user_id, id_alimento, cantidad, fecha_nutricion, tipo_nutricion }])
        .select()
        .single();

      if (error) throw new Error(error.message);

      return data;
    },
    onSuccess: ({ fecha_nutricion, id_alimento, user_id }) => {
      queryclient.invalidateQueries({
        queryKey: ['nutricion', fecha_nutricion, id_alimento, user_id],
      });
    },
  });
};

// Funcion para subir una nutricion a la base de datos
export const insertNutricio = async ({
  user_id,
  periodos_store,
  queryclient,
  storedDate,
  today,
}: {
  user_id: string;
  periodos_store: any;
  queryclient: any;
  storedDate: string;
  today: string;
}) => {
  if (storedDate !== today) {
    console.log('La fecha almacenada es la misma que la de hoy. No se hace nada.');
    return;
  }

  // Hook personalizado para insertar una nutricion
  const insertNutricion = await useInsertNutricion(queryclient);
  const insertAlimento = await useInsertAlimento(queryclient);

  console.log('Subiendo nutricion a la base de datos');

  if (storedDate != today) {
    // Upload data before clearing
    insertNutricion.mutate({
      user_id: user_id,
      tipo_nutricion: 'Desayuno',
      calorias: periodos_store.Desayuno?.macros.Calorias || 0,
      proteina: periodos_store.periodos.Desayuno?.macros.Proteinas || 0,
      carbohidratos: periodos_store.periodos.Desayuno?.macros.Carbohidratos || 0,
      grasa: periodos_store.periodos.Desayuno?.macros.Grasas || 0,
      fecha: storedDate,
    });
    insertNutricion.mutate({
      tipo_nutricion: 'Comida',
      user_id: user_id,
      calorias: periodos_store.periodos.Comida?.macros.Calorias || 0,
      proteina: periodos_store.periodos.Comida?.macros.Proteinas || 0,
      carbohidratos: periodos_store.periodos.Comida?.macros.Carbohidratos || 0,
      grasa: periodos_store.periodos.Comida?.macros.Grasas || 0,
      fecha: storedDate,
    });
    insertNutricion.mutate({
      user_id: user_id,
      tipo_nutricion: 'Cena',
      calorias: periodos_store.periodos.Cena?.macros.Calorias || 0,
      proteina: periodos_store.periodos.Cena?.macros.Proteinas || 0,
      carbohidratos: periodos_store.periodos.Cena?.macros.Carbohidratos || 0,
      grasa: periodos_store.periodos.Cena?.macros.Grasas || 0,
      fecha: storedDate,
    });
    insertNutricion.mutate({
      user_id: user_id,
      tipo_nutricion: 'Snacks',
      calorias: periodos_store.periodos.Snacks?.macros.Calorias || 0,
      proteina: periodos_store.periodos.Snacks?.macros.Proteinas || 0,
      carbohidratos: periodos_store.periodos.Snacks?.macros.Carbohidratos || 0,
      grasa: periodos_store.periodos.Snacks?.macros.Grasas || 0,
      fecha: storedDate,
    });

    // Upload all alimentos
    const periodos = periodos_store;
    for (const periodo in periodos) {
      if (periodos[periodo as keyof typeof periodos]) {
        const alimentos = periodos[periodo as keyof typeof periodos]?.alimentos || [];
        for (const alimento of alimentos) {
          insertAlimento.mutate({
            user_id: user_id,
            tipo_nutricion: periodo as Database['public']['Enums']['tipo_nutricion_enum'],
            id_alimento: alimento.alimento.id,
            cantidad: alimento.cantidad,
            fecha_nutricion: storedDate,
          });
        }
      }
    }
  }
};
