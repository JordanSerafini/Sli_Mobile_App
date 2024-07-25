// App.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigationContainer from './NavigationContainer';
//import { getCustomersPaginated } from './app/utils/functions/customer_functions';

export default function App() {
/*
  useEffect(() => {
    // Fonction asynchrone à l'intérieur de useEffect
    const fetchData = async () => {
      try {
        await getCustomersPaginated("", 25, 0);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchData(); // Appel de la fonction asynchrone
  }, []);
*/
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
