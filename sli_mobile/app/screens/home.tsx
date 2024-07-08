// screens/Home.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';

import { NavigationProp } from '@react-navigation/native';



const HomeScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const handleLogout = () => {
    // Actions après la déconnexion
    navigation.navigate('Login');
  };

  return (
    <View className='bg-red-500 w-full h-full'>
      <Text>Home Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
