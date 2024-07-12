import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import BadgePerso from '../../components/UI/BadgePerso';
import ButtonPerso from '../../components/UI/ButtonPerso';
import FabPerso from '../../components/UI/Fab/FabGroup';

const IndexScreen: React.FC = () => {

  const clientClick = () => {
    router.push('/client_item/client');
  };

  return (
    <PaperProvider>
      <SafeAreaView className='flex items-center justify-center w-full h-full'>
        <ButtonPerso mode={"contained"} icon={"account"} text={"Client"} css="w-4.5/10 self-center" onPress={clientClick} />
        <BadgePerso text='5' />
        <FabPerso />
      </SafeAreaView>
    </PaperProvider>
  );
};

export default IndexScreen;
