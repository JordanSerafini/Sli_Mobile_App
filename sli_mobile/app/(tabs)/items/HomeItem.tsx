import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonPerso from '../../components/UI/ButtonPerso';
import { StyleSheet } from 'react-native';

interface HomeItemProps {
  onItemClick: () => void;
  onStockClick: () => void;
}

const HomeItem: React.FC<HomeItemProps> = ({ onItemClick, onStockClick }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ButtonPerso 
        mode="outlined" 
        icon="account" 
        text="Liste des articles" 
        css="w-4.5/10 self-center" 
        onPress={onItemClick} 
      />
      <ButtonPerso 
        mode="outlined" 
        icon="account" 
        text="STOCK" 
        css="w-4.5/10 self-center" 
        onPress={onStockClick} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeItem;
