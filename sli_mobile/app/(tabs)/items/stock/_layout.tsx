import { Stack } from 'expo-router';

export default function StockLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: 'Stock Documents' }} />
      <Stack.Screen name="StockDocumentDetail" options={{ headerShown: true, title: 'Stock Document Details' }} />
      <Stack.Screen name="Table" options={{ headerShown: true, title: 'Table' }} />
    </Stack>
  );
}
