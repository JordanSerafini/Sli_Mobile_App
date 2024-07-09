import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppNavigationContainer from './NavigationContainer';

export default function App() {
  return (
    <View style={styles.container}>
      <AppNavigationContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
