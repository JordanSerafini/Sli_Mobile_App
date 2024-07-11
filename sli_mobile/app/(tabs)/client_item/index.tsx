import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import ButtonPerso from '../../components/UI/ButtonPerso';
import DialogPerso from '../../components/UI/DialogPerso';

const IndexScreen: React.FC = () => {
  const [dialogVisible, setDialogVisible] = useState(false);

  const clientClick = () => {
    router.push('/client_item/client');
  };

  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);

  return (
    <SafeAreaView className='flex items-center justify-center w-full h-full'>
      <ButtonPerso mode={"contained"} icon={"account"} text={"Client"} css="w-4.5/10 self-center" onPress={clientClick}/>
      <ButtonPerso mode={"contained"} icon={"information"} text={"Show Dialog"} css="w-4.5/10 self-center" onPress={showDialog}/>
      <DialogPerso visible={dialogVisible} hideDialog={hideDialog} />
    </SafeAreaView>
  );
};

export default IndexScreen;
