import { supabase } from '@libs/supabase';
import { useAuth } from '@providers/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Database } from '~/src/database.types';

export const getSeriesByEjercicioAndEntrenamiento = (
  idEjercicio: string,
  idEntrenamiento: string,
  tipo_ejercicio: Database['public']['Enums']['tipo_ejercicio_enum']
) => {
  return useQuery({
    queryKey: ['series', idEjercicio, idEntrenamiento],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(`series_${tipo_ejercicio}`)
        .select()
        .eq('id_ejercicio', idEjercicio)
        .eq('id_entrenamiento', idEntrenamiento);

      if (error) throw Error(error.message);

      return data;
    },
  });
};

export const getCaloriasByEjercicioAndEntrenamiento = (
  idEjercicio: string,
  idEntrenamiento: string,
  tipo_ejercicio: Database['public']['Enums']['tipo_ejercicio_enum']
) => {
  return useQuery({
    queryKey: ['series', idEjercicio, idEntrenamiento],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(`series_${tipo_ejercicio}`)
        .select()
        .eq('id_ejercicio', idEjercicio)
        .eq('id_entrenamiento', idEntrenamiento);

      if (error) throw Error(error.message);

      return data.reduce((acc, serie) => acc + (serie.calorias ?? 0), 0);
    },
  });
};

export const getVolumenByEjercicio = (idEjercicio: string, idEntrenamiento: string) => {
  return useQuery({
    queryKey: ['series', idEjercicio, idEntrenamiento],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('series_fuerza')
        .select()
        .eq('id_ejercicio', idEjercicio)
        .eq('id_entrenamiento', idEntrenamiento);

      if (error) throw Error(error.message);

      return data.reduce((acc, serie) => acc + (serie.peso ?? 0), 0);
    },
  });
};

export const getSeriesByEntrenamiento = (idEntrenamiento: string) => {
  return useQuery({
    queryKey: ['series', idEntrenamiento],
    queryFn: async () => {
      const { data: seriesFuerza, error: errorFuerza } = await supabase
        .from('series_fuerza')
        .select()
        .eq('id_entrenamiento', idEntrenamiento);

      const { data: seriesCardio, error: errorCardio } = await supabase
        .from('series_cardio')
        .select()
        .eq('id_entrenamiento', idEntrenamiento);

      const { data: seriesCalistenia, error: errorCalistenia } = await supabase
        .from('series_calistenia')
        .select()
        .eq('id_entrenamiento', idEntrenamiento);

      if (errorFuerza || errorCardio || errorCalistenia) throw Error('Error fetching series');

      return [...seriesFuerza, ...seriesCardio, ...seriesCalistenia];
    },
  });
};

// Hook personalizado para insertar una serie
export const useInsertSerieFuerza = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      id,
      id_ejercicio,
      id_entrenamiento,
      check,
      repeticiones,
      peso,
      calorias,
    }: Database['public']['Tables']['series_fuerza']['Insert']) {
      const { data, error } = await supabase
        .from(`series_fuerza`)
        .insert({ id, id_ejercicio, id_entrenamiento, check, repeticiones, peso, calorias });

      if (error) throw new Error(error.message);

      return data;
    },
  });
};

// Hook personalizado para insertar una serie de cardio
export const useInsertSerieCardio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      id,
      id_ejercicio,
      id_entrenamiento,
      check,
      duracion,
      distancia,
      calorias,
    }: Database['public']['Tables']['series_cardio']['Insert']) {
      const { data, error } = await supabase
        .from(`series_cardio`)
        .insert({ id, id_ejercicio, id_entrenamiento, check, duracion, distancia, calorias });

      if (error) throw new Error(error.message);

      return data;
    },
  });
};

// Hook personalizado para insertar una serie de calistenia
export const useInsertSerieCalistenia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      id,
      id_ejercicio,
      id_entrenamiento,
      check,
      repeticiones,
      calorias,
    }: Database['public']['Tables']['series_calistenia']['Insert']) {
      const { data, error } = await supabase
        .from(`series_calistenia`)
        .insert({ id, id_ejercicio, id_entrenamiento, check, repeticiones, calorias });

      if (error) throw new Error(error.message);

      return data;
    },
  });
};
