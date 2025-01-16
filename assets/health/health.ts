export enum sexo {
  Masculino = 'Masculino',
  Femenino = 'Femenino',
}

export enum tipoPeso {
  Kilogramos = 'Kilogramos',
  Libras = 'Libras',
}

export enum tipoDistancia {
  Millas = 'Millas',
  Kilometros = 'Kilometros',
}

export type usuarioType = {
  idUsuario: string;
  nombre: string;
  correo: string;
  sexo: sexo;
  fechaNacimiento: string;
  peso: tipoPeso;
  distancia: tipoDistancia;
};

export type objetivosType = {
  idUsuario: string;
  calorias: number;
  sueño: number;
  agua: number;
};

export type objetivosDiariosType = {
  idUsuario: string;
  objetivo: objetivosType;
  fecha: string;
  sueño?: number;
  agua?: number;
};

export const usuarios: Record<number, usuarioType> = {
  1: {
    idUsuario: 'victorino_3c',
    nombre: 'Nicolas Victorino',
    correo: 'nicolas@gmail.com',
    sexo: sexo.Masculino,
    fechaNacimiento: '2003-07-30',
    peso: tipoPeso.Kilogramos,
    distancia: tipoDistancia.Kilometros,
  },
  // Agregar más usuarios
};

export const objetivos: Record<number, objetivosType> = {
  1: {
    idUsuario: 'victorino_3c',
    calorias: 2400,
    sueño: 8,
    agua: 3.2,
  },
  // Agregar más objetivos
};

export const objetivosDiarios: Record<number, objetivosDiariosType> = {
  1: {
    idUsuario: 'victorino_3c',
    fecha: '2025-01-06',
    objetivo: objetivos[1],
    sueño: 8,
    agua: 3.1,
  },
  2: {
    idUsuario: 'victorino_3c',
    objetivo: objetivos[1],
    fecha: '2025-01-07',
    sueño: 7,
    agua: 1.9,
  },
  3: {
    idUsuario: 'victorino_3c',
    objetivo: objetivos[1],
    fecha: '2025-01-08',
    sueño: 8,
  },
  4: {
    idUsuario: 'victorino_3c',
    objetivo: objetivos[1],
    fecha: '2025-01-09',
    agua: 2.5,
  },
  // Agregar más objetivos diarios
};

export const getUsuarioById = (id: number): usuarioType | null => {
  return usuarios[id] || null;
};

export const getObjetivosById = (id: number): objetivosType | null => {
  return objetivos[id] || null;
};

export const getUsuarioByUsername = (username: string): usuarioType | null => {
  return Object.values(usuarios).find((usuario) => usuario.idUsuario === username) || null;
};

export const getObjetivosByUsername = (username: string): objetivosType | null => {
  return Object.values(objetivos).find((objetivo) => objetivo.idUsuario === username) || null;
};

export const getObjetivosDiariosByUsername = (
  username: string,
  date: string
): objetivosDiariosType | null => {
  return (
    Object.values(objetivosDiarios).find(
      (objetivo) => objetivo.idUsuario === username && objetivo.fecha === date
    ) || null
  );
};
