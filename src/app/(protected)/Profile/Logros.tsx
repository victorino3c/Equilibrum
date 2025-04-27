import { View, Text } from 'react-native';
import React, { useState } from 'react';
import ThreeOptionsButton from '~/src/components/Buttons/ThreeOptionsButton';
import LogrosEjercicio from '~/src/components/Logros/LogrosEjercicio';
import LogrosNutricion from '~/src/components/Logros/LogrosNutricion';
import LogrosGeneral from '~/src/components/Logros/LogrosGeneral';

const Logros = () => {
  const [modo, setModo] = useState<string>('Ejercicio');

  return (
    <View style={{ marginHorizontal: 10 }}>
      <ThreeOptionsButton
        style={{ marginTop: 20 }}
        option1="Ejercicio"
        option2="General"
        option3="Nutrición"
        method={setModo}
        selected={modo}
      />
      {modo === 'Ejercicio' && <LogrosEjercicio />}
      {modo === 'Nutrición' && <LogrosNutricion />}
      {modo === 'General' && <LogrosGeneral />}
    </View>
  );
};

export default Logros;
