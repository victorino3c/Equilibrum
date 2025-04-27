import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const AddMedida = () => {
  return (
    <View>
      <Stack.Screen
        name="Profile/AddMedida"
        options={{
          headerShown: true,
          title: 'Añadir medida',
          headerTitleAlign: 'center',
          headerRight: () => (
            <View
              style={{
                backgroundColor: '#6608ff',
                padding: 10,
                paddingVertical: 5,
                borderRadius: 10,
              }}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Añadir</Text>
            </View>
          ),
        }}
      />
      <Text>AddMedida</Text>
    </View>
  );
};

export default AddMedida;
