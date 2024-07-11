import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';

import BadgePerso from '../../components/UI/BadgePerso';
import ButtonPerso from '../../components/UI/ButtonPerso';
import FabGroup from '../../components/UI/FabGroup';

const IndexScreen: React.FC = () => {

  const clientClick = () => {
    router.push('/client_item/client');
  };



  return (
    <SafeAreaView className='flex items-center justify-center w-full h-full'>
      <ButtonPerso mode={"contained"} icon={"account"} text={"Client"} css="w-4.5/10 self-center" onPress={clientClick}/>
      <BadgePerso text='5'/>
      <FabGroup/>
    </SafeAreaView>
  );
};

export default IndexScreen;
