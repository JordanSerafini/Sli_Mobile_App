import React from "react";
import { Modal, TextInput } from "react-native-paper";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon_2 from "react-native-vector-icons/FontAwesome6";
import ButtonPerso from "../../../components/UI/ButtonPerso";
import { theme } from "../../../utils/theme";

interface AddClientModalProps {
  visible: boolean;
  onDismiss: () => void;
}

interface Client {
  name: string;
  email?: string;
  phone: string;
  addressType: string;
  address: string;
  postalCode: string;
  city: string;
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
    addressType: "Livraison",
    address: "",
    postalCode: "",
    city: "",
    note: "",
  });

  const handleAddressTypeChange = (type: string) => {
    setClient({ ...client, addressType: type });
  };

  return (
    <Modal visible={visible} onDismiss={onDismiss}>
      {/*<TouchableWithoutFeedback onPress={onDismiss}> */}
        <View className="h-9.5/10 w-9.5/10 bg-white self-center rounded-lg items-center justify-evenly">
          <TouchableOpacity
            className="absolute top-0 right-0 p-2 z-10"
            onPress={onDismiss}
          >
            <Icon name="close" size={25} color="red" />
          </TouchableOpacity>
          <View className="gap-y-2 h-9/10 w-full">
            {/*---------------------------------------- Nom du client -----------------------------*/}
            <View className="flex-row gap-2 w-full justify-center pt-4">
              <Icon
                name="person"
                size={30}
                color={`${theme.accent}`}
                className="w-2/10"
              />
              <TextInput
                placeholder="Nom du client"
                className="h-8 justify-center w-8/10"
                value={client.name}
                onChangeText={(text) => setClient({ ...client, name: text })}
              />
            </View>
            {/*---------------------------------------- Tel du client -----------------------------*/}
            <View className="flex-row gap-2 w-full justify-center">
              <Icon
                name="contact-phone"
                size={30}
                color={`${theme.accent}`}
                className="w-2/10"
              />
              <TextInput
                placeholder="Téléphone"
                className="h-8 justify-center w-8/10"
                value={client.phone}
                onChangeText={(text) => setClient({ ...client, phone: text })}
              />
            </View>
            {/*---------------------------------------- Email du client -----------------------------*/}
            <View className="flex-row gap-2 w-full justify-center">
              <Icon
                name="email"
                size={30}
                color={`${theme.accent}`}
                className="w-2/10"
              />
              <TextInput
                placeholder="Email"
                className="h-8 justify-center w-8/10"
                value={client.email}
                onChangeText={(text) => setClient({ ...client, email: text })}
              />
            </View>
            {/*---------------------------------------- Selection type adresse -----------------------------*/}
            <View className="flex-row w-9.5/10 gap-1 pl-3">
              <TouchableOpacity
                className={`w-1/2 items-center ${
                  client.addressType === "Livraison"
                    ? "bg-gray-200"
                    : "bg-white"
                }`}
                onPress={() => handleAddressTypeChange("Livraison")}
              >
                <Icon_2 name="truck" size={30} color={`${theme.accent}`} />
                <Text className="text-lg">Livraison</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`w-1/2 items-center ${
                  client.addressType === "Facturation"
                    ? "bg-gray-200"
                    : "bg-white"
                }`}
                onPress={() => handleAddressTypeChange("Facturation")}
              >
                <Icon_2
                  name="file-invoice-dollar"
                  size={30}
                  color={`${theme.accent}`}
                />
                <Text className="text-lg">Facturation</Text>
              </TouchableOpacity>
            </View>
            {/*---------------------------------------- adresse -----------------------------*/}
            <View className="w-full justify-center gap-1">
            {/*---------------------------------------- Selection type adresse -----------------------------*/}
            <View className="flex-row gap-1 w-8.5/10">
                <Icon
                  name="home"
                  size={30}
                  color={`${theme.accent}`}
                  className="w-2/10"
                />
                <TextInput
                  placeholder="Adresse"
                  className="h-8 justify-center w-full"
                  value={client.address}
                  onChangeText={(text) =>
                    setClient({ ...client, address: text })
                  }
                />
              </View>
            {/*---------------------------------------- CP + ville -----------------------------*/}
              <View className="flex-row w-full gap-2 items-center justify-center">
                <TextInput
                  placeholder="Code postal"
                  className="h-8 justify-center w-3/10"
                  value={client.postalCode}
                  onChangeText={(text) =>
                    setClient({ ...client, postalCode: text })
                  }
                />
                <TextInput
                  placeholder="Ville"
                  className="h-8 justify-center w-6/10"
                  value={client.city}
                  onChangeText={(text) => setClient({ ...client, city: text })}
                />
              </View>
            </View>
          {/*---------------------------------------- Note -----------------------------*/} 
            <View className="flex-row gap-2 w-full justify-center">
              <Icon
                name="note"
                size={30}
                color={`${theme.accent}`}
                className="w-2/10"
              />
              <TextInput
                placeholder="..."
                multiline={true}
                numberOfLines={8}
                className="justify-center w-8/10"
                value={client.note}
                onChangeText={(text) => setClient({ ...client, note: text })}
              />
            </View>
          </View>
          {/*---------------------------------------- Bouton ajouter -----------------------------*/}
          <ButtonPerso
            css="w-9.5/10"
            icon="account-plus"
            mode="contained"
            text="Ajouter"
            onPress={() => console.log("Ajouter", client)}
          />
        </View>
      {/*</TouchableWithoutFeedback>*/}
    </Modal>
  );
};

export default AddClientModal;
