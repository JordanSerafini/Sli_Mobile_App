import { Stack } from 'expo-router';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';

type StackParamList = {
  index: undefined;
  client: undefined;
  clientDetail: { name?: string };
};

type ClientDetailRouteProp = RouteProp<StackParamList, 'clientDetail'>;

export default function ClientLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: 'Articles / Clients' }} />
      <Stack.Screen name="client" options={{ headerShown: true, title: 'Client List' }} />
      <Stack.Screen
        name="clientDetail"
        options={({ route }: { route: ClientDetailRouteProp }): StackNavigationOptions => ({
          headerShown: true,
          title: route.params?.name ? `Details of ${route.params.name}` : 'Client Details',
        })}
      />
    </Stack>
  );
}
