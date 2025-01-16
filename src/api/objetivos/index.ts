import { supabase } from '@libs/supabase';
import { useAuth } from '@providers/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const getObjetivos = () => {
  const { session } = useAuth();

  const id = session?.user.id;

  return useQuery({
    queryKey: ['objetivos', id],
    queryFn: async () => {
      if (!id) {
        throw Error('No user id');
      }

      const { data, error } = await supabase.from('objetivos').select().eq('user_id', id).single();

      if (error) throw Error(error.message);

      return data;
    },
  });
};

export const getObjetivosdiariosByFecha = (fecha: string) => {
  const { session } = useAuth();

  const id = session?.user.id;

  if (!id) {
    throw Error('No user id');
  }
  return useQuery({
    queryKey: ['objetivos_diarios', fecha],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('objetivos_diarios')
        .select()
        .eq('user_id', id)
        .eq('fecha', fecha)
        .single();

      if (error) throw Error(error.message);

      return data;
    },
  });
};

export const useUpdateObjetivoDiarioByFecha = () => {
  const queryClient = useQueryClient();

  const { session } = useAuth();

  const id = session?.user.id;

  if (!id) {
    throw Error('No user id');
  }
  return useMutation({
    async mutationFn({ fecha, objetivo }: { fecha: string; objetivo: string }) {
      const { data, error } = await supabase
        .from('objetivos_diarios')
        .upsert({ user_id: id, fecha: fecha, objetivo: objetivo });

      if (error) throw Error(error.message);

      return { fecha };
    },
    async onSuccess(data: { fecha: string }) {
      queryClient.invalidateQueries({ queryKey: ['objetivos_diarios', data.fecha] });
    },
  });
};

export const useDeleteObjetivoDiarioByFecha = () => {
  const queryClient = useQueryClient();

  const { session } = useAuth();

  const id = session?.user.id;

  if (!id) {
    throw Error('No user id');
  }
  return useMutation({
    mutationFn: async (fecha: string) => {
      const { error } = await supabase
        .from('objetivos_diarios')
        .delete()
        .eq('user_id', id)
        .eq('fecha', fecha);

      if (error) throw Error(error.message);

      return fecha;
    },
    onSuccess: (fecha: string) => {
      queryClient.invalidateQueries({ queryKey: ['objetivos_diarios', fecha] });
    },
  });
};

export const useUpdateObjetivoDiarioCaloriasByFecha = () => {
  const queryClient = useQueryClient();

  const { session } = useAuth();

  const id = session?.user.id;

  if (!id) {
    throw Error('No user id');
  }
  return useMutation({
    async mutationFn({ fecha, calorias }: { fecha: string; calorias: number | null }) {
      const { data, error } = await supabase
        .from('objetivos_diarios')
        .upsert({ user_id: id, fecha: fecha, calorias: calorias });

      if (error) throw Error(error.message);

      return { fecha };
    },
    async onSuccess(data: { fecha: string }) {
      queryClient.invalidateQueries({ queryKey: ['objetivos_diarios', data.fecha] });
    },
  });
};

export const useUpdateObjetivosDiariosSueñoByFecha = () => {
  const queryClient = useQueryClient();

  const { session } = useAuth();

  const id = session?.user.id;

  if (!id) {
    throw Error('No user id');
  }

  return useMutation({
    async mutationFn({ fecha, sueño }: { fecha: string; sueño: number | null }) {
      const { data, error } = await supabase
        .from('objetivos_diarios')
        .upsert({ user_id: id, fecha, sueño })
        .single();

      if (error) throw Error(error.message);

      return { fecha };
    },
    async onSuccess(data: { fecha: string }) {
      queryClient.invalidateQueries({ queryKey: ['objetivos_diarios', data.fecha] });
    },
  });
};

export const useUpdateObjetivosDiariosAguaByFecha = () => {
  const queryClient = useQueryClient();

  const { session } = useAuth();

  const id = session?.user.id;

  if (!id) {
    throw Error('No user id');
  }
  return useMutation({
    async mutationFn({ fecha, agua }: { fecha: string; agua: number | null }) {
      const { data, error } = await supabase
        .from('objetivos_diarios')
        .upsert({ user_id: id, fecha: fecha, agua: agua });

      if (error) throw Error(error.message);

      return { fecha };
    },
    async onSuccess(data: { fecha: string }) {
      queryClient.invalidateQueries({ queryKey: ['objetivos_diarios', data.fecha] });
    },
  });
};
