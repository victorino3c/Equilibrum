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

export const getNumberEntrenamientos = () => {
  const { session } = useAuth();
  const userId = session?.user.id;

  return useQuery({
    queryKey: ['numberEntrenamientos'],
    queryFn: async () => {
      if (!userId) {
        throw new Error('No user id');
      }

      const { data, error } = await supabase
        .from('entrenamiento')
        .select('id')
        .eq('user_id', userId);

      if (error) throw new Error(error.message);

      return data.length;
    },
    enabled: !!userId, // Solo se ejecuta si hay un userId
  });
};

export const getVolumeLiftedSinceDate = (date: string) => {
  const { session } = useAuth();
  const userId = session?.user.id;

  return useQuery({
    queryKey: ['volumeLiftedSinceDate', date],
    queryFn: async () => {
      if (!userId) {
        throw new Error('No user id');
      }

      //Get all entrenamientos since date
      const { data: entrenamientos, error: entrenamientosError } = await supabase
        .from('entrenamiento')
        .select('id')
        .eq('user_id', userId)
        .gte('fecha', date);

      if (entrenamientosError) throw new Error(entrenamientosError.message);

      //Get all series fuerza on entrenamientos since date
      const { data: seriesFuerza, error: seriesFuerzaError } = await supabase
        .from('series_fuerza')
        .select('id, id_ejercicio, repeticiones, peso')
        .in(
          'id_entrenamiento',
          entrenamientos.map((entrenamiento) => entrenamiento.id)
        );

      if (seriesFuerzaError) throw new Error(seriesFuerzaError.message);

      //Sumar el volumen levantado
      const volumeLifted = seriesFuerza.reduce((acc, serie) => {
        return acc + (serie.peso ?? 0) * (serie.repeticiones ?? 0);
      }, 0);

      return volumeLifted;
    },
    enabled: !!userId, // Solo se ejecuta si hay un userId
  });
};

export const getVolumePerWeekForGivenMonths = (months: number) => {
  const { session } = useAuth();
  const userId = session?.user.id;

  return useQuery({
    queryKey: ['volumePerWeekForGivenMonths', months],
    queryFn: async () => {
      if (!userId) {
        throw new Error('No user id');
      }

      // Calculate the start date based on the number of months
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - months);
      const formattedStartDate = startDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD

      // Get all entrenamientos since the start date
      const { data: entrenamientos, error: entrenamientosError } = await supabase
        .from('entrenamiento')
        .select('id, fecha')
        .eq('user_id', userId)
        .gte('fecha', formattedStartDate);

      if (entrenamientosError) throw new Error(entrenamientosError.message);

      if (!entrenamientos || entrenamientos.length === 0) {
        return [];
      }

      // Get all series fuerza for the retrieved entrenamientos
      const { data: seriesFuerza, error: seriesFuerzaError } = await supabase
        .from('series_fuerza')
        .select('id, id_entrenamiento, repeticiones, peso')
        .in(
          'id_entrenamiento',
          entrenamientos.map((entrenamiento) => entrenamiento.id)
        );

      if (seriesFuerzaError) throw new Error(seriesFuerzaError.message);

      // Group series by week and calculate volume per week
      const volumePerWeek: { [week: string]: number } = {};

      entrenamientos.forEach((entrenamiento) => {
        const week = formatWeekRange(getWeekFromDate(entrenamiento.fecha)); // Helper function to get the week of the year
        if (!volumePerWeek[week]) {
          volumePerWeek[week] = 0;
        }

        const seriesForEntrenamiento = seriesFuerza.filter(
          (serie) => serie.id_entrenamiento === entrenamiento.id
        );

        const volumeForEntrenamiento = seriesForEntrenamiento.reduce(
          (acc, serie) => acc + (serie.peso ?? 0) * (serie.repeticiones ?? 0),
          0
        );

        volumePerWeek[week] += volumeForEntrenamiento;
      });

      // Convert the volumePerWeek object into an array of { week, volume } for easier use
      return Object.entries(volumePerWeek).map(([week, volume]) => ({
        value: volume,
        label: week,
        dataPointText: volume.toString(),
      }));
    },
    enabled: !!userId, // Only execute if there is a userId
  });
};

// Helper function to get the week of the year from a date
const getWeekFromDate = (date: string): string => {
  const d = new Date(date);
  const firstDayOfYear = new Date(d.getFullYear(), 0, 1);
  const pastDaysOfYear = (d.getTime() - firstDayOfYear.getTime()) / (1000 * 60 * 60 * 24);
  return `${d.getFullYear()}-W${Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)}`;
};

const formatWeekRange = (week: string): string => {
  const [year, weekNumber] = week.split('-W').map(Number);

  // Calculate the first day of the week (Monday)
  const firstDayOfYear = new Date(year, 0, 1);
  const daysOffset = (weekNumber - 1) * 7 - firstDayOfYear.getDay() + 1; // Adjust for ISO week starting on Monday
  const firstDayOfWeek = new Date(year, 0, 1 + daysOffset);

  // Calculate the last day of the week (Sunday)
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

  // Format the dates as day/month
  const formatDate = (date: Date) => `${date.getDate()}/${date.getMonth() + 1}`;

  return `${formatDate(firstDayOfWeek)}`; // - ${formatDate(lastDayOfWeek)}`;
};
