import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';

const IndexScreen: React.FC = () => {

  const clientClick = () => {
    router.push('/client_item/client');
  }

  return (
    <SafeAreaView className='flex items-center justify-center w-full h-full'>
      <TouchableOpacity onPress={clientClick}>
        <Text>Client</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};



export default IndexScreen;
