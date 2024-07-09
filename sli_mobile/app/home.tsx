import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const HomeScreen: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
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
