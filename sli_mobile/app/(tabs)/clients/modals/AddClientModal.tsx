import React from "react";
import { Modal, Button, Text } from "react-native-paper";
import { TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface AddClientModalProps {
  visible: boolean;
  onDismiss: () => void;
}

const AddClientModal: React.FC<AddClientModalProps> = ({
  visible,
  onDismiss,
}) => {
  console.log("AddClientModal");
  return (
    <Modal visible={visible} onDismiss={onDismiss}>
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View className="h-9.5/10 w-9.5/10 bg-white self-center rounded-2xl">
          <TouchableOpacity className="absolute top-0 right-0 p-2">
            <Icon name="close" size={25} color="red" onPress={onDismiss} />
          </TouchableOpacity>

        

        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddClientModal;
