import { Stack } from 'expo-router';

export default function ItemsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: 'Article' }} />
      <Stack.Screen name="itemList" options={{ headerShown: false, title: 'Liste article' }} />
      <Stack.Screen
        name="itemDetail"
        options={{ headerShown: true, title: 'Client Details' }}
      />
      <Stack.Screen name="stock/StockDocumentList" options={{ headerShown: false, title: 'Liste article' }} />

    </Stack>
  );
}
