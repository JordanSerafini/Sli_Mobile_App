import React from "react";
import { Modal, Button, Text } from "react-native-paper";
import { TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ButtonPerso from "../../../components/UI/ButtonPerso";

interface AddClientModalProps {
  visible: boolean;
  onDismiss: () => void;
}

interface Client {
  name: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  note: string;
}

const AddClientModal: React.FC<AddClientModalProps> = ({
  visible,
  onDismiss,
}) => {

  const [client, setClient] = React.useState<Client>({
    name: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
    country: "",
    note: "",
  });

  return (
    <Modal visible={visible} onDismiss={onDismiss}>
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View className="h-9.5/10 w-9.5/10 bg-white self-center rounded-2xl p-4">
          <TouchableOpacity className="absolute top-0 right-0 p-2">
            <Icon name="close" size={25} color="red" onPress={onDismiss} />
          </TouchableOpacity>
        <View>
          <Text>test</Text>
        </View>


        <ButtonPerso css="w-full" icon="account-plus" mode="contained" text="Ajouter" onPress={() => console.log("Ajouter")} />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddClientModal;
