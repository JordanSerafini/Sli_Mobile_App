import React from 'react';
import { Modal, Button, Text } from 'react-native-paper';
import { ViewStyle, View } from 'react-native';

interface EditClientModalProps {
  visible: boolean;
  onDismiss: () => void;
}

const EditClientModal: React.FC<EditClientModalProps> = ({ visible, onDismiss }) => {
  return (
    <Modal visible={visible} onDismiss={onDismiss}>
      <View style={{ padding: 20 } as ViewStyle}>
        <Text>Editer un client</Text>
        {/* Ajoutez ici le contenu spécifique de votre modal */}
        <Button onPress={onDismiss}>Close</Button>
      </View>
    </Modal>
  );
};

export default EditClientModal;
