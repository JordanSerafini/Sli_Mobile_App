import React from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Redirect } from 'expo-router';

export default function ClientScreen() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Client Screen</Text>
    </View>
  );
}
