import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import FabItem from './FAB/FabItem';
import ButtonPerso from '../../components/UI/ButtonPerso';
import Icon from "react-native-vector-icons/AntDesign";

const IndexScreen: React.FC = () => {

  const itemClick = () => {
    router.push('/items/itemList');
  };

  const stockClick = () => {
    router.push('/items/StockDocumentList');
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#1e40af', 
      secondary: '#BFDBFE',
      accent: '#1E3A8A', 
    },
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <ButtonPerso mode="outlined" icon="account" text="Liste des articles" css="w-4.5/10 self-center" onPress={itemClick} />
        <ButtonPerso mode="outlined" icon="account" text="STOCK" css="w-4.5/10 self-center" onPress={stockClick} />
        <FabItem 
          showAddModal={() => {}} 
          showEditItemModal={() => {}} 
          showAddItemModal={() => {}} 
        />
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IndexScreen;
