// screens/Login.tsx
import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface LoginProps {
  navigation: NavigationProp<any>;
}

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF6347',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
