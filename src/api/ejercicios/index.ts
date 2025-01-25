import { supabase } from '@libs/supabase';
import { useAuth } from '@providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

// Hook personalizado para obtener ejercicios
export const useGetEjercicios = () => {
  const { session } = useAuth();
  const userId = session?.user.id;

  return useQuery({
    queryKey: ['ejercicios', userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error('No user id');
      }

      const { data, error } = await supabase.from('ejercicios').select();

      if (error) throw new Error(error.message);

      return data;
    },
    enabled: !!userId, // Solo se ejecuta si hay un userId
  });
};

// Hook personalizado para obtener un ejercicio por ID
export const useGetEjercicioById = (id: string) => {
  return useQuery({
    queryKey: ['ejercicio', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('ejercicios').select().eq('id', id);

      if (error) throw new Error(error.message);

      return data?.[0];
    },
    enabled: !!id, // Solo se ejecuta si hay un ID
  });
};

// Hook personalizado para obtener los ejercicios de un entrenamiento
export const getEjerciciosFromIds = (ids: string[]) => {
  if (!ids) {
    throw new Error('No ids');
  }

  return useQuery({
    queryKey: ['ejercicios', ids],
    queryFn: async () => {
      const { data, error } = await supabase.from('ejercicios').select().in('id', ids);

      if (error) throw new Error(error.message);

      return data;
    },
  });
};
