import { Text, View } from 'react-native';
import Formula from '~/src/components/Health/formula';
import Sueño from '~/src/components/Health/Sueño';
import Agua from '~/src/components/Health/Agua';

export default function Health() {
  return (
    <View className="flex-1">
      <Formula objective="2400" nutricion="1800" exercise="0" />
      <Sueño />
      <Agua />
    </View>
  );
}
