import React from 'react';
import { View, StyleSheet, AppRegistry } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigationContainer from './NavigationContainer';
import globalErrorHandler from './app/utils/logs/errorHandler';

// Configurer le gestionnaire d'erreurs global pour les erreurs JavaScript
ErrorUtils.setGlobalHandler(globalErrorHandler);

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <AppNavigationContainer />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// Enregistrer le composant principal
AppRegistry.registerComponent('main', () => App);
