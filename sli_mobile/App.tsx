import React from "react";
import { View, StyleSheet } from "react-native";
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigationContainer from "./NavigationContainer";

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <View style={styles.container}>
          <AppNavigationContainer />
        </View>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
