import React from "react";
import { View, StyleSheet } from "react-native";
import AppNavigationContainer from "./NavigationContainer";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
