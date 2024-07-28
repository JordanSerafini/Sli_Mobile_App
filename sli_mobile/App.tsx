import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigationContainer from './NavigationContainer'; // Assurez-vous de fournir le bon chemin

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
      <View style={styles.container}>
        <AppNavigationContainer />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3a8a', // Optionnel: si vous souhaitez que le fond global soit aussi bleu
  },
});
