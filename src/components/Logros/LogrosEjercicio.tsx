import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import NumeroEntrenamientos from './Ejercicio/NumeroEntrenamientos';

const LogrosEjercicio = () => {
  const [openNumeroEntrenamientos, setOpenNumeroEntrenamientos] = useState<boolean>(false);

  return (
    <ScrollView style={{ paddingBottom: 40 }}>
      <NumeroEntrenamientos open={openNumeroEntrenamientos} setOpen={setOpenNumeroEntrenamientos} />
    </ScrollView>
  );
};

export default LogrosEjercicio;
