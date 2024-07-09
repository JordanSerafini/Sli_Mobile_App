import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('jordan@solution-logique.fr');
  const [password, setPassword] = useState('pass123');

  const router = useRouter();

  const handleLogin = () => {
    router.push('/home');
  };

  return (
    <View >
      <Text>Login Screen</Text>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};



export default LoginScreen;
