import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

import Dashboard from '../components/home/Dashboard';
import MainHome from '../components/home/MainHome';

const HomeScreen: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('user');
    router.push('/login');
  };


  return (
    <View className='h-screen w-screen'>

      <Dashboard />
      <MainHome/>
      {/*<Button title="LOGOUT" onPress={handleLogout} />*/}
    </View>
  );
};



export default HomeScreen;
