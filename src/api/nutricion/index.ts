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
