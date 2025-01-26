import { supabase } from '@libs/supabase';
import { useAuth } from '@providers/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { Database } from '~/src/database.types';

// Hook personalizado para obtener ejercicios
export const getEntrenamientos = () => {
  const { session } = useAuth();
  const userId = session?.user.id;

  return useQuery({
    queryKey: ['entrenamientos'],
    queryFn: async () => {
      if (!userId) {
        throw new Error('No user id');
      }

      const { data, error } = await supabase
        .from('entrenamiento')
        //.select('id, fecha')
        .select()
        .eq('user_id', userId);

      if (error) throw new Error(error.message);

      return data;
    },
    enabled: !!userId, // Solo se ejecuta si hay un userId
  });
};

// Hook personalizado para obtener un entrenamiento
export const getEntrenamiento = (id: string) => {
  if (!id) {
    throw new Error('No id');
  }

  return useQuery({
    queryKey: ['entrenamiento', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('entrenamiento').select().eq('id', id).single();

      if (error) throw new Error(error.message);

      return data;
    },
  });
};

// Hook personalizado para obtener los ejercicios de un entrenamiento
export const getEjerciciosEntrenamiento = (idEntrenamiento: string) => {
  if (!idEntrenamiento) {
    throw new Error('No id');
  }

  return useQuery({
    queryKey: ['ejerciciosEntrenamiento', idEntrenamiento],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ejercicios_entrenamiento')
        .select('id_ejercicio')
        .eq('id_entrenamiento', idEntrenamiento);

      if (error) throw new Error(error.message);

      return data;
    },
  });
};

// Hook personalizado para insertar un entrenamiento
export const useInsertEntrenamiento = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user.id;

  return useMutation({
    async mutationFn({
      calorias,
      notas,
      titulo,
      duracion,
      sensacion,
      series,
      volumen,
      fecha,
    }: Database['public']['Tables']['entrenamiento']['Insert']) {
      if (!userId) {
        throw new Error('No user id');
      }

      const { data, error } = await supabase
        .from('entrenamiento')
        .insert([
          { user_id: userId, calorias, notas, titulo, duracion, sensacion, series, volumen, fecha },
        ])
        .select()
        .single();

      if (error) throw new Error(error.message);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entrenamientos', userId] });
    },
  });
};

// Hook personalizado para eliminar un entrenamiento
export const useDeleteEntrenamiento = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: string) {
      if (!id) {
        throw new Error('No id');
      }

      const { error } = await supabase.from('entrenamiento').delete().eq('id', id);

      if (error) throw new Error(error.message);

      return id;
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['entrenamiento', id] });
      queryClient.invalidateQueries({ queryKey: ['entrenamientos'] });
      queryClient.invalidateQueries({ queryKey: ['ejerciciosEntrenamiento', id] });
    },
  });
};
