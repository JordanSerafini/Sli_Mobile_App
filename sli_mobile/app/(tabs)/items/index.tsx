import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import ButtonPerso from '../../components/UI/ButtonPerso';
import FabPerso from '../../components/UI/Fab/client/FabGroupClient';

const IndexScreen: React.FC = () => {

  const clientClick = () => {
    router.push('/items/itemList');
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3B82F6', 
      secondary: '#BFDBFE',
      accent: '#1E3A8A', 
    },
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView className='flex items-center justify-center w-full h-full '>
      <ButtonPerso mode={"outlined"} icon={"account"} text={"Liste des articles"} css="w-4.5/10 self-center" onPress={clientClick} />
      <FabPerso />


      </SafeAreaView>
    </PaperProvider>
  );
};

export default IndexScreen;
