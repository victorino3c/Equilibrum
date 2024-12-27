import { StatusBar } from 'expo-status-bar';
import { Platform, View, Text } from 'react-native';

export default function Modal() {
  return (
    <>
      <View style={{ flex: 1 }}>
        <Text>Modal</Text>
      </View>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </>
  );
}
