import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import ClientScreen from '../screens/Client';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { Redirect } from 'expo-router';

const Tab = createBottomTabNavigator();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return children;
}

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
      >
        {() => (
          <ProtectedRoute>
            <HomeScreen />
          </ProtectedRoute>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Client"
        options={{
          tabBarLabel: 'Client',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
        }}
      >
        {() => (
          <ProtectedRoute>
            <ClientScreen />
          </ProtectedRoute>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
