import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import ButtonPerso from '../../components/UI/ButtonPerso';

const IndexScreen: React.FC = () => {

  const itemClick = () => {
    router.push('/items/itemList');
  };

  const stockClick = () => {
    router.push('/items/stock/StockDocumentList');
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
      <ButtonPerso mode={"outlined"} icon={"account"} text={"Liste des articles"} css="w-4.5/10 self-center" onPress={itemClick} />
      <ButtonPerso mode={"outlined"} icon={"account"} text={"STOCK"} css="w-4.5/10 self-center" onPress={stockClick} />


      </SafeAreaView>
    </PaperProvider>
  );
};

export default IndexScreen;
