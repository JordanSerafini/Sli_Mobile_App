import React from "react";
import { Modal, TextInput, Portal, Dialog, Button } from "react-native-paper";
import {
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon_2 from "react-native-vector-icons/FontAwesome6";
import ButtonPerso from "../../../components/UI/ButtonPerso";
import { theme } from "../../../utils/theme";
import { createCustomer } from "../../../utils/functions/customer_functions";

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
  NoteClear: string;
  MainDeliveryContact_Email: string | null;
  MainInvoicingContact_Email: string | null;
  MainInvoicingContact_Cellphone: string | null;
  MainDeliveryContact_CellPhone: string | null;
  MainInvoicingAddress_Address1: string | null;
  MainDeliveryAddress_Address1: string | null;
  MainInvoicingAddress_PostalCode: string | null;
  MainDeliveryAddress_PostalCode: string | null;
  MainInvoicingAddress_City: string | null;
  MainDeliveryAddress_City: string | null;
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
    NoteClear: "",
    MainDeliveryContact_Email: null,
    MainInvoicingContact_Email: null,
    MainInvoicingContact_Cellphone: null,
    MainDeliveryContact_CellPhone: null,
    MainInvoicingAddress_Address1: null,
    MainDeliveryAddress_Address1: null,
    MainInvoicingAddress_PostalCode: null,
    MainDeliveryAddress_PostalCode: null,
    MainInvoicingAddress_City: null,
    MainDeliveryAddress_City: null,
  });

  const handleAddressTypeChange = (type: string) => {
    setClient({ ...client, addressType: type });
  };

  const handleCreateCustomer = (customer: Client) => {
    // Set the appropriate fields based on address type
    if (customer.addressType === "Livraison") {
      customer.MainDeliveryContact_Email = customer.email || null;
      customer.MainDeliveryContact_CellPhone = customer.phone;
      customer.MainDeliveryAddress_Address1 = customer.address;
      customer.MainDeliveryAddress_PostalCode = customer.postalCode;
      customer.MainDeliveryAddress_City = customer.city;
      customer.MainInvoicingContact_Email = null;
      customer.MainInvoicingContact_Cellphone = null;
      customer.MainInvoicingAddress_Address1 = null;
      customer.MainInvoicingAddress_PostalCode = null;
      customer.MainInvoicingAddress_City = null;
    } else {
      customer.MainInvoicingContact_Email = customer.email || null;
      customer.MainInvoicingContact_Cellphone = customer.phone;
      customer.MainInvoicingAddress_Address1 = customer.address;
      customer.MainInvoicingAddress_PostalCode = customer.postalCode;
      customer.MainInvoicingAddress_City = customer.city;
      customer.MainDeliveryContact_Email = null;
      customer.MainDeliveryContact_CellPhone = null;
      customer.MainDeliveryAddress_Address1 = null;
      customer.MainDeliveryAddress_PostalCode = null;
      customer.MainDeliveryAddress_City = null;
    }
    createCustomer(customer);
    setConfirmationVisible(false);
    onDismiss();
  };

  const [confirmationVisible, setConfirmationVisible] = React.useState(false);

  const showConfirmation = () => setConfirmationVisible(true);
  const hideConfirmation = () => setConfirmationVisible(false);

  return (
    <>
      <Modal visible={visible} onDismiss={onDismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ height: "100%" }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
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
                      onChangeText={(text) =>
                        setClient({ ...client, city: text })
                      }
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
                    value={client.NoteClear}
                    onChangeText={(text) => setClient({ ...client, NoteClear: text })}
                  />
                </View>
              </View>
              {/*---------------------------------------- Bouton ajouter -----------------------------*/}
              <ButtonPerso
                css="w-9.5/10"
                icon="account-plus"
                mode="contained"
                text="Ajouter"
                onPress={showConfirmation}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
      <Portal>
        <Dialog visible={confirmationVisible} onDismiss={hideConfirmation}>
          <Dialog.Title>Confirmer la création du client</Dialog.Title>
          <Dialog.Content>
            <Text>Nom: {client.name}</Text>
            <Text>Email: {client.email}</Text>
            <Text>Téléphone: {client.phone}</Text>
            <Text>Type d'adresse: {client.addressType}</Text>
            <Text>Adresse: {client.address}</Text>
            <Text>Code postal: {client.postalCode}</Text>
            <Text>Ville: {client.city}</Text>
            <Text>Note: {client.NoteClear}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideConfirmation}>Annuler</Button>
            <Button onPress={() => handleCreateCustomer(client)}>Confirmer</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

export default AddClientModal;
