// App.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigationContainer from './NavigationContainer';
import { ModalProvider } from './app/context/ModalContext';
import ModalPortal from './app/Modal/ModalPortal';

export default function App() {
  return (
    <SafeAreaProvider>
      <ModalProvider>
        <View style={styles.container}>
          <AppNavigationContainer />
          <ModalPortal />
        </View>
      </ModalProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
