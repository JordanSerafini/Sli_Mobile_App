import { Stack } from 'expo-router';

export default function ChantierLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: 'article / client' }} />
      <Stack.Screen name="client" options={{ headerShown: false }} />
      
    </Stack>
  );
}
