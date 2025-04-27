import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import NumeroEntrenamientos from './Ejercicio/NumeroEntrenamientos';
import VolumenTotal from './Ejercicio/VolumenTotal';
import DistanciaTotal from './Ejercicio/DistanciaTotal';

const LogrosEjercicio = () => {
  const [openNumeroEntrenamientos, setOpenNumeroEntrenamientos] = useState<boolean>(true);
  const [openVolumenTotal, setOpenVolumenTotal] = useState<boolean>(true);
  const [openDistanciaTotal, setOpenDistanciaTotal] = useState<boolean>(true);

  return (
    <ScrollView style={{ flex: 1 }}>
      <NumeroEntrenamientos open={openNumeroEntrenamientos} setOpen={setOpenNumeroEntrenamientos} />
      <VolumenTotal open={openVolumenTotal} setOpen={setOpenVolumenTotal} />
      <DistanciaTotal open={openDistanciaTotal} setOpen={setOpenDistanciaTotal} />
      <View style={{ height: 40, width: 40 }} />
    </ScrollView>
  );
};

export default LogrosEjercicio;
