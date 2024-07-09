// screens/Login.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';



const LoginScreen = () => {
  const handleLogin = () => {
    console.log('Login button pressed');
  };

  return (
    <View className=''>
      <Text>Login Screen</Text>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};



export default LoginScreen;
