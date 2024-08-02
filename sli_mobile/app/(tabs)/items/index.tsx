import { router, useRouter, useSegments } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import FabItem from './FAB/FabItem';
import ButtonPerso from '../../components/UI/ButtonPerso';
import StockDocumentList from './StockDocumentList';
import ItemList from './itemList';

const IndexScreen: React.FC = () => {
  const [content, setContent] = useState<React.ReactNode>(null);
  const segments = useSegments(); 

  const itemClick = () => {
    setContent(<ItemList />);
  };

  const stockClick = () => {
    setContent(<StockDocumentList />);
  };

  useEffect(() => {
    // Reset content when the segments change (i.e., navigation changes)
    setContent(null);
  }, [segments]);

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
      {!content ? (
        <SafeAreaView style={styles.container}>
          <ButtonPerso mode="outlined" icon="account" text="Liste des articles" css="w-4.5/10 self-center" onPress={itemClick} />
          <ButtonPerso mode="outlined" icon="account" text="STOCK" css="w-4.5/10 self-center" onPress={stockClick} />
          
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.container}>
          {content}
        </SafeAreaView>
      )}
      <FabItem
            showAddModal={() => {}}
            showEditItemModal={() => {}}
            showAddItemModal={() => {}}
          />
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
