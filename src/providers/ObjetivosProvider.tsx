import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

import { getObjetivos } from '@api/objetivos';

import { Database } from '../database.types';

type objetivosData = {
  objetivos: Database['public']['Tables']['objetivos']['Row'] | undefined;
  setObjetivos?: (data: Database['public']['Tables']['objetivos']['Row']) => void;
};

const ObjetivosContext = createContext<objetivosData>({
  objetivos: undefined,
  setObjetivos: () => {},
});

export default function ObjetivosProvider({ children }: PropsWithChildren) {
  const [objetivos, setObjetivos] = useState<
    Database['public']['Tables']['objetivos']['Row'] | undefined
  >(undefined);

  useEffect(() => {
    const { data } = getObjetivos();
    if (data) {
      setObjetivos(data);
    }
  }, []);

  return (
    <ObjetivosContext.Provider value={{ objetivos, setObjetivos }}>
      {children}
    </ObjetivosContext.Provider>
  );
}

export const useObjetivos = () => useContext(ObjetivosContext);
