export const parseDuracion = (duracion: number): string => {
  const horas = Math.floor(duracion / 60);
  const minutos = duracion % 60;

  if (horas === 0) {
    return `${minutos} min`;
  } else if (minutos === 0) {
    return `${horas} h`;
  } else {
    return `${horas} h ${minutos} min`;
  }
};
