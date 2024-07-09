import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ClientScreen: React.FC = () => {


  return (
    <View style={styles.container}>
      <Text>client Screen</Text>
      
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

export default ClientScreen;
