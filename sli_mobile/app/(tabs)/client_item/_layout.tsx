import { Stack } from 'expo-router';

export default function ClientLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: 'Articles / Clients' }} />
      <Stack.Screen name="client" options={{ headerShown: false, title: 'Client List' }} />
      <Stack.Screen
        name="clientDetail"
        options={{ headerShown: true, title: 'Client Details' }}
      />
    </Stack>
  );
}
