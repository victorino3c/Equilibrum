import { supabase } from '@libs/supabase';
import { useAuth } from '@providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

// Hook personalizado para obtener ejercicios
export const getEntrenamientos = () => {
  const { session } = useAuth();
  const userId = session?.user.id;

  return useQuery({
    queryKey: ['entrenamientos', userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error('No user id');
      }

      const { data, error } = await supabase
        .from('entrenamiento')
        .select('id, fecha')
        .eq('user_id', userId);

      if (error) throw new Error(error.message);

      return data;
    },
    enabled: !!userId, // Solo se ejecuta si hay un userId
  });
};

// Hook personalizado para obtener un entrenamiento
export const getEntrenamiento = (id: string) => {
  return useQuery({
    queryKey: ['entrenamiento', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('entrenamiento').select().eq('id', id);

      if (error) throw new Error(error.message);

      return data;
    },
  });
};
