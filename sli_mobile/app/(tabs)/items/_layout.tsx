import { Stack } from 'expo-router';

export default function ClientLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: 'Clients' }} />
      <Stack.Screen name="itemList" options={{ headerShown: false, title: 'Client Liste' }} />
      <Stack.Screen
        name="itemDetail"
        options={{ headerShown: true, title: 'Client Details' }}
      />
    </Stack>
  );
}
