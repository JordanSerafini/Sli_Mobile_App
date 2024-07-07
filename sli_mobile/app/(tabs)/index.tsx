// App.js
import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

export default function App() {
  return (
    <View style={tw`flex-1 items-center justify-center bg-red-500`}>
      <Text style={tw`text-white text-lg`}>Hello, Tailwind CSS with Expo!</Text>
    </View>
  );
}
