import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import CaloriasTotal from './Nutricion/CaloriasTotal';
import ProteinaTotal from './Nutricion/ProteinaTota';
import GrasaTotal from './Nutricion/GrasaTotal';
import CarbohidratosTotal from './Nutricion/CarbohidratosTotal';

const LogrosNutricion = () => {
  const [openCaloriasTotal, setOpenCaloriasTotal] = useState<boolean>(true);
  const [openProteinaTotal, setOpenProteinaTotal] = useState<boolean>(true);
  const [openGrasaTotal, setOpenGrasaTotal] = useState<boolean>(true);
  const [openCarbohidratosTotal, setOpenCarbohidratosTotal] = useState<boolean>(true);

  return (
    <ScrollView style={{ flex: 1 }}>
      <CaloriasTotal open={openCaloriasTotal} setOpen={setOpenCaloriasTotal} />
      <ProteinaTotal open={openProteinaTotal} setOpen={setOpenProteinaTotal} />
      <GrasaTotal open={openGrasaTotal} setOpen={setOpenGrasaTotal} />
      <CarbohidratosTotal open={openCarbohidratosTotal} setOpen={setOpenCarbohidratosTotal} />
      <View style={{ height: 40, width: 40 }} />
    </ScrollView>
  );
};

export default LogrosNutricion;
