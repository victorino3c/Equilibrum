import { Link, Tabs } from 'expo-router';

import TabBar from '~/src/components/TabBar';

import { Text } from 'react-native';

import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';

export default function TabLayout() {
  const [fontsLoaded] = useFonts({
    IcoMoon: require('~/assets/fonts/icomoon.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  // Default the Health tab to be selected
  const initialTab = '(health)';

  return (
    <>
      <StatusBar style="light" />
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{ tabBarHideOnKeyboard: true }}>
        <Tabs.Screen
          name="(exercise)"
          options={{
            headerShown: false,
            tabBarLabel: 'Exercise',
          }}
        />
        <Tabs.Screen
          name="(nutrition)"
          options={{
            headerShown: false,
            tabBarLabel: 'Nutrition',
          }}
        />
        <Tabs.Screen
          name="(health)"
          options={{
            headerShown: false,
            tabBarLabel: 'Health',
          }}
        />
        <Tabs.Screen
          name="(profile)"
          options={{
            headerShown: false,
            tabBarLabel: 'Profile',
            headerRight: () => (
              <Link href="/modal" asChild>
                <Text>Hola</Text>
              </Link>
            ),
          }}
        />
      </Tabs>
    </>
  );
}
