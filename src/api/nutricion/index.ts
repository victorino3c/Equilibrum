import { supabase } from '@libs/supabase';
import { useAuth } from '@providers/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

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
