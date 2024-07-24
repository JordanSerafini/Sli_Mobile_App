import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postLogs } from '../utils/functions/logs_function';

const HomeScreen: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    router.push('/login');
  };

  const handleSendLog = async () => {
    try {
      await postLogs('test');
      console.log('Log sent successfully');
    } catch (error) {
      console.error('Failed to send log:', error);
    }
  };

  const handleThrowError = () => {
    throw new Error('test throw error');
  };

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="LOGOUT" onPress={handleLogout} />
      <Button title="Send Log" onPress={handleSendLog} />
      <Button title="Throw Error" onPress={handleThrowError} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
