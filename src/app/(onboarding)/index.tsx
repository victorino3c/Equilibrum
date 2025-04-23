import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import React from 'react';

const onboarding = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
      <View style={{ marginTop: 30, alignItems: 'flex-end', paddingRight: 20 }}>
        <Link href="/(onboarding)/signUp" style={styles.textButton}>
          Saltar
        </Link>
      </View>
      <View style={styles.titleTextView}>
        <Text style={styles.titleText}>Bienvenido a</Text>
        <Text style={{ ...styles.titleText, fontWeight: 700 }}>Equilibrum</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>onboarding</Text>
      </View>
    </SafeAreaView>
  );
};

export default onboarding;

const styles = StyleSheet.create({
  textButton: {
    color: '#6608ff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
  titleText: {
    fontSize: 35,
    color: '#6608ff',
    //fontWeight: '700',
    marginBottom: 0,
    textAlign: 'center',
  },
  titleTextView: {
    marginBottom: 20,
  },
});
