import { Stack } from 'expo-router';

export default function ItemLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: 'Stock Documents' }} />
      <Stack.Screen name="StockDocumentList" options={{ 
          headerShown: true, 
          title: 'Liste article', 
          headerStyle: {
            backgroundColor: '#1e3a8a',
          },
          headerTintColor: '#fff',
        }} />
    </Stack>
  );
}
