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
