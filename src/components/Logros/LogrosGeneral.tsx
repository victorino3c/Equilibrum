import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import DiasAgua from './General/DiasAgua';
import DiasSueño from './General/DiasSueño';
const LogrosGeneral = () => {
  const [openDiasAgua, setOpenDiasAgua] = useState<boolean>(true);
  const [openDiasSueño, setOpenDiasSueño] = useState<boolean>(true);

  return (
    <ScrollView style={{ flex: 1 }}>
      <DiasAgua open={openDiasAgua} setOpen={setOpenDiasAgua} />
      <DiasSueño open={openDiasSueño} setOpen={setOpenDiasSueño} />
      <View style={{ height: 40, width: 40 }} />
    </ScrollView>
  );
};

export default LogrosGeneral;
