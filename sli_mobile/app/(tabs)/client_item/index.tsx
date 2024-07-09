import { router } from 'expo-router';
import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const IndexScreen: React.FC = () => {

  const clientClick = () => {
    router.push('/client_item/client');
  }

  return (
    <View className='flex items-center justify-center w-full h-full'>
      <TouchableOpacity onPress={clientClick}>
        <Text>Client</Text>
      </TouchableOpacity>
    </View>
  );
};



export default IndexScreen;
