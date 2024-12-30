import { View, ScrollView } from 'react-native';
import { useState } from 'react';

import TwoOptionsButton from '~/src/components/Buttons/TwoOptions';
import NuevoView from '~/src/components/Ejercicio/NuevoView';
import HistorialView from '~/src/components/Ejercicio/HistorialView';

export default function Exercise() {
  const [selectedView, setSelectedView] = useState<string>('Nuevo');

  return (
    <View className="flex-1">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 70 }}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
        <TwoOptionsButton
          option1="Nuevo"
          option2="Historial"
          method={setSelectedView}
          selected={selectedView}
        />
        {selectedView === 'Nuevo' ? <NuevoView /> : <HistorialView />}
      </ScrollView>
    </View>
  );
}
