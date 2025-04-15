import { View, ScrollView } from 'react-native';
import { useState } from 'react';

import HoyView from '~/src/components/Nutricion/HoyView';
import HistorialView from '~/src/components/Nutricion/HistorialView';
import TwoOptionsButton from '~/src/components/Buttons/TwoOptions';

import { entrenamientoStore } from '@store/Entrenamientostore';

export default function Nutrition() {
  const [selectedView, setSelectedView] = useState<string>('Hoy');
  const { entrenamientoTerminado } = entrenamientoStore();

  return (
    <View className="flex-1">
      <ScrollView
        contentContainerStyle={
          entrenamientoTerminado ? { paddingBottom: 70 } : { paddingBottom: 170 }
        }
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
        <TwoOptionsButton
          option1="Hoy"
          option2="Historial"
          style={{ marginTop: 20 }}
          method={setSelectedView}
          selected={selectedView}
        />
        {selectedView === 'Hoy' ? <HoyView /> : <HistorialView />}
      </ScrollView>
    </View>
  );
}
