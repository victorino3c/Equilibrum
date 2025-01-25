import { supabase } from '@libs/supabase';
import { useAuth } from '@providers/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const getProfile = () => {
  const { session } = useAuth();

  const id = session?.user.id;

  return useQuery({
    queryKey: ['profile', id],
    queryFn: async () => {
      if (!id) {
        throw Error('No user id');
      }

      const { data, error } = await supabase.from('profiles').select().eq('id', id).single();

      if (error) throw Error(error.message);

      return data;
    },
  });
};

export const getProfileById = (id: string) => {
  return useQuery({
    queryKey: ['profile', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('profiles').select().eq('id', id).single();

      if (error) throw Error(error.message);

      return data;
    },
  });
};
