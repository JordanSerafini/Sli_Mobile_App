import React from 'react';
import { Modal, Button, Text } from 'react-native-paper';
import { ViewStyle, View } from 'react-native';

interface AddClientModalProps {
  visible: boolean;
  onDismiss: () => void;
}

const AddClientModal: React.FC<AddClientModalProps> = ({ visible, onDismiss }) => {
    console.log("AddClientModal");
  return (
    <Modal visible={visible} onDismiss={onDismiss}>
      <View className='h-9.5/10 w-9.5/10 bg-white self-center'>
        <Text>Ajouter un client</Text>
        {/* Ajoutez ici le contenu spécifique de votre modal */}
        <Button onPress={onDismiss}>Close</Button>
      </View>
    </Modal>
  );
};

export default AddClientModal;
