import { View, ScrollView } from 'react-native';
import { useState } from 'react';

import TwoOptionsButton from '~/src/components/Buttons/TwoOptions';

export default function Nutrition() {
  const [selectedView, setSelectedView] = useState<string>('Hoy');

  return (
    <View className="flex-1">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 70 }}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
        <TwoOptionsButton
          option1="Hoy"
          option2="Historial"
          style={{ marginTop: 20 }}
          method={setSelectedView}
          selected={selectedView}
        />
        {selectedView === 'Nuevo' ? null : null}
      </ScrollView>
    </View>
  );
}
