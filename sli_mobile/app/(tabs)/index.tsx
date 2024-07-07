// App.js
import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import { url } from '../utils/url';

export default function App() {

  const dataClient = async () => {
    const response = await fetch(url.client + '/customers');
    const data = await response.json();
    console.log(data);
  }

  dataClient();

  return (
    <View style={tw`flex-1 items-center justify-center bg-red-500`}>
      <Text style={tw`text-white text-lg`}>Hello, Tailwind CSS with Expo!</Text>
    </View>
  );
}
