import { View, Text } from 'react-native';
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const icons: { [key: string]: (props: any) => JSX.Element } = {
    '(exercise)': (props) => (
      <Text style={{ fontFamily: 'IcoMoon', fontSize: 24, color: props.color }}>&#xe901;</Text>
    ),
    '(nutrition)': (props) => (
      <Text style={{ fontFamily: 'IcoMoon', fontSize: 24, color: props.color }}>&#xe900;</Text>
    ),
    '(health)': (props) => <Feather name="home" size={24} {...props} />,
    '(profile)': (props) => <AntDesign name="user" size={24} {...props} />,
  };

  const iconFocused = '#ffffff';
  const iconUnfocused = '#777777';

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        //console.log('route.name:', route.name); // Add this line for debugging

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tab}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <View style={isFocused ? styles.tabFocused : null}>
              {icons[route.name]
                ? icons[route.name]({
                    color: isFocused ? iconFocused : iconUnfocused,
                  })
                : null}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    width: '100%',
    paddingHorizontal: '10%',
    paddingVertical: 15,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabFocused: {
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#6608ff',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#66608ff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default TabBar;
