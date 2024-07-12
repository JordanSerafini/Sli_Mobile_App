import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigationContainer from "./NavigationContainer";



export default function App() {
  return (
      <SafeAreaProvider >
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
