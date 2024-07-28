import React, { useEffect, useState, useRef, useCallback } from "react";
import { Modal, TextInput, Portal, Dialog, Button, ActivityIndicator, Menu, Searchbar } from "react-native-paper";
import {
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
  FlatList
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon_2 from "react-native-vector-icons/FontAwesome6";
import ButtonPerso from "../../../components/UI/ButtonPerso";
import { theme } from "../../../utils/theme";
import { createCustomer, getCustomersPaginated } from "../../../utils/functions/customer_functions";
import { Customer } from "../../../@types/customer.type";

interface EditClientModalProps {
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

const EditClientModal: React.FC<EditClientModalProps> = ({ visible, onDismiss }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [createdClient, setCreatedClient] = useState<{ name: string; id: string | null }>({
    name: "",
    id: null,
  });

  const searchTimer = useRef<NodeJS.Timeout | null>(null);

  const fetchCustomers = useCallback(async (query: string = "", page: number = 1) => {
    try {
      if (isInitialLoad || page === 1) setLoading(true);
      else setFetchingMore(true);
      const response = await getCustomersPaginated(query, 25, page);
      const customersData = response.customers;
      setHasMore(customersData.length > 0); // Update hasMore based on whether more customers were returned
      setCustomers(prevCustomers => (page === 1 ? customersData : [...prevCustomers, ...customersData]));
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    } finally {
      setLoading(false);
      setFetchingMore(false);
      setIsInitialLoad(false);
    }
  }, [isInitialLoad]);

  useEffect(() => {
    fetchCustomers(searchQuery, page);
  }, [page, fetchCustomers]);

  useEffect(() => {
    if (selectedCustomerId) {
      const selectedCustomer = customers.find((cust) => cust.Id === selectedCustomerId);
      console.log("selectedCustomer", selectedCustomer);
      if (selectedCustomer) {
        setClient({
          name: selectedCustomer.Name || "",
          email: selectedCustomer.MainDeliveryContact_Email || "",
          phone: selectedCustomer.MainDeliveryContact_CellPhone || "",
          addressType: "Livraison",
          address: selectedCustomer.MainDeliveryAddress_Address1 || "",
          postalCode: selectedCustomer.MainDeliveryAddress_ZipCode || "",
          city: selectedCustomer.MainDeliveryAddress_City || "",
          note: selectedCustomer.NotesClear || "",
        });
      }
    } else {
      setClient(null);
    }
  }, [selectedCustomerId, customers]);

  const handleAddressTypeChange = (type: string) => {
    if (client) {
      setClient({ ...client, addressType: type });
    }
  };

  const handleCreateCustomer = async (customer: Client) => {
    let customerData: any = {
      Name: customer.name,
      NotesClear: customer.note,
    };

    if (customer.addressType === "Livraison") {
      customerData.MainDeliveryContact_Email = customer.email;
      customerData.MainDeliveryContact_CellPhone = customer.phone;
      customerData.MainDeliveryAddress_Address1 = customer.address;
      customerData.MainDeliveryAddress_ZipCode = customer.postalCode;
      customerData.MainDeliveryAddress_City = customer.city;
    } else {
      customerData.MainInvoicingContact_Email = customer.email;
      customerData.MainInvoicingContact_CellPhone = customer.phone;
      customerData.MainInvoicingAddress_Address1 = customer.address;
      customerData.MainInvoicingAddress_ZipCode = customer.postalCode;
      customerData.MainInvoicingAddress_City = customer.city;
    }

    try {
      console.log("Creating customer with data:", customerData);
      onDismiss();
    } catch (error) {
      console.error("Failed to add customer:", error);
    }
  };

  const showConfirmation = () => setConfirmationVisible(true);
  const hideConfirmation = () => setConfirmationVisible(false);
  const hideSuccessMessage = () => setSuccessMessageVisible(false);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }
    searchTimer.current = setTimeout(() => {
      setPage(1);
      setIsInitialLoad(true);
      fetchCustomers(query, 1);
    }, 1500); // 1.5 seconds delay
  };

  const loadMoreCustomers = () => {
    if (!fetchingMore && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <>
      <Modal visible={visible} onDismiss={onDismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ height: "100%" }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
            <View style={{ height: "95%", width: "95%", backgroundColor: "white", alignSelf: "center", borderRadius: 10, alignItems: "center" }}>
              <TouchableOpacity style={{ position: "absolute", top: 0, right: 0, padding: 10, zIndex: 10 }} onPress={onDismiss}>
                <Icon name="close" size={25} color="#e11d48" />
              </TouchableOpacity>
              <SafeAreaView style={{ height: "90%", width: "100%", alignItems: "center", paddingTop: 10 }}>
                {loading ? (
                  <ActivityIndicator size="large" color={theme.accent} />
                ) : (
                  <>
                    <Searchbar
                      placeholder="Rechercher un client"
                      onChangeText={handleSearchChange}
                      value={searchQuery}
                      style={{ marginBottom: 10, width: "90%" }}
                    />
                    {!selectedCustomerId && (
                      <View style={{ width: "90%" }}>
                        <Button onPress={() => setMenuVisible(true)} mode="outlined">
                          Sélectionner un client
                        </Button>
                        <Portal>
                          <Menu
                            visible={menuVisible}
                            onDismiss={() => setMenuVisible(false)}
                            anchor={<Button onPress={() => setMenuVisible(true)} mode="outlined">Sélectionner un client</Button>}
                          >
                            <FlatList
                              data={customers}
                              keyExtractor={(item) => item.Id ? item.Id.toString() : ""}
                              renderItem={({ item }) => (
                                <Menu.Item
                                  key={item.Id}
                                  onPress={() => {
                                    setSelectedCustomerId(item.Id);
                                    setMenuVisible(false);
                                  }}
                                  title={item.Name}
                                />
                              )}
                              ListFooterComponent={
                                hasMore ? (
                                  <Button onPress={loadMoreCustomers} mode="outlined">
                                    Charger plus
                                  </Button>
                                ) : null
                              }
                              ListEmptyComponent={() => <Text>Aucun client disponible</Text>}
                            />
                          </Menu>
                        </Portal>
                      </View>
                    )}
                    {client && (
                      <>
                        <View style={{ flexDirection: "row", height: 40, width: "100%", justifyContent: "space-evenly", alignItems: "center", marginBottom: 10, marginTop: 10 }}>
                          <Icon name="person" size={30} color={theme.accent} />
                          <TextInput
                            placeholder="Nom du client"
                            style={{ justifyContent: "center", width: "80%", borderRadius: 10, backgroundColor: "white", borderColor: "gray", borderWidth: 1, paddingHorizontal: 10 }}
                            value={client.name}
                            onChangeText={(text) => setClient({ ...client, name: text })}
                          />
                        </View>
                        <View style={{ flexDirection: "row", height: 40, width: "100%", justifyContent: "space-evenly", alignItems: "center", marginBottom: 10 }}>
                          <Icon name="contact-phone" size={30} color={theme.accent} />
                          <TextInput
                            placeholder="Téléphone"
                            style={{ justifyContent: "center", width: "80%", borderRadius: 10, backgroundColor: "white", borderColor: "gray", borderWidth: 1, paddingHorizontal: 10 }}
                            value={client.phone}
                            onChangeText={(text) => setClient({ ...client, phone: text })}
                          />
                        </View>
                        <View style={{ flexDirection: "row", height: 40, width: "100%", justifyContent: "space-evenly", alignItems: "center", marginBottom: 10 }}>
                          <Icon name="email" size={30} color={theme.accent} />
                          <TextInput
                            placeholder="Email"
                            style={{ justifyContent: "center", width: "80%", borderRadius: 10, backgroundColor: "white", borderColor: "gray", borderWidth: 1, paddingHorizontal: 10 }}
                            value={client.email}
                            onChangeText={(text) => setClient({ ...client, email: text })}
                          />
                        </View>
                        <View style={{ flexDirection: "row", width: "100%", justifyContent: "center", marginBottom: 10 }}>
                          <TouchableOpacity
                            style={{ width: "45%", alignItems: "center", height: 80, justifyContent: "center", borderRadius: 10, borderWidth: client.addressType === "Livraison" ? 2 : 0, borderColor: client.addressType === "Livraison" ? "blue" : "white", backgroundColor: client.addressType === "Livraison" ? "gray" : "white" }}
                            onPress={() => handleAddressTypeChange("Livraison")}
                          >
                            <Icon_2 name="truck" size={30} color={client.addressType === "Livraison" ? "#1e3a8a" : "#e5e7eb"} />
                            <Text style={{ fontSize: 18, color: client.addressType === "Livraison" ? "blue" : "gray" }}>
                              Livraison
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{ width: "45%", alignItems: "center", height: 80, justifyContent: "center", borderRadius: 10, borderWidth: client.addressType === "Facturation" ? 2 : 0, borderColor: client.addressType === "Facturation" ? "blue" : "white", backgroundColor: client.addressType === "Facturation" ? "gray" : "white" }}
                            onPress={() => handleAddressTypeChange("Facturation")}
                          >
                            <Icon_2 name="file-invoice-dollar" size={30} color={client.addressType === "Facturation" ? "#1e3a8a" : "#e5e7eb"} />
                            <Text style={{ fontSize: 18, color: client.addressType === "Facturation" ? "blue" : "gray" }}>
                              Facturation
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{ width: "100%", justifyContent: "center", marginBottom: 10 }}>
                          <View style={{ flexDirection: "row", height: 40, width: "100%", justifyContent: "space-evenly", alignItems: "center", marginBottom: 10 }}>
                            <Icon name="home" size={30} color={theme.accent} />
                            <TextInput
                              placeholder="Adresse"
                              style={{ justifyContent: "center", width: "80%", borderRadius: 10, backgroundColor: "white", borderColor: "gray", borderWidth: 1, paddingHorizontal: 10 }}
                              value={client.address}
                              onChangeText={(text) => setClient({ ...client, address: text })}
                            />
                          </View>
                          <View style={{ flexDirection: "row", height: 40, width: "100%", justifyContent: "space-evenly", alignItems: "center", marginBottom: 10 }}>
                            <TextInput
                              placeholder="Code postal"
                              style={{ justifyContent: "center", width: "30%", borderRadius: 10, backgroundColor: "white", borderColor: "gray", borderWidth: 1, paddingHorizontal: 10 }}
                              value={client.postalCode}
                              onChangeText={(text) => setClient({ ...client, postalCode: text })}
                            />
                            <TextInput
                              placeholder="Ville"
                              style={{ justifyContent: "center", width: "60%", borderRadius: 10, backgroundColor: "white", borderColor: "gray", borderWidth: 1, paddingHorizontal: 10 }}
                              value={client.city}
                              onChangeText={(text) => setClient({ ...client, city: text })}
                            />
                          </View>
                        </View>
                        <View style={{ flexDirection: "row", width: "100%", height: 100, justifyContent: "space-evenly", alignItems: "center" }}>
                          <Icon name="note" size={30} color={theme.accent} />
                          <TextInput
                            placeholder="Note"
                            multiline={true}
                            numberOfLines={8}
                            style={{ justifyContent: "center", width: "80%", borderRadius: 10, backgroundColor: "white", borderColor: "gray", borderWidth: 1, paddingHorizontal: 10 }}
                            value={client.note}
                            onChangeText={(text) => setClient({ ...client, note: text })}
                          />
                        </View>
                      </>
                    )}
                  </>
                )}
              </SafeAreaView>
              {client && (
                <ButtonPerso
                  css="w-9.5/10 bg-blue-800"
                  icon="account-plus"
                  mode="contained"
                  text="Ajouter"
                  onPress={showConfirmation}
                />
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
      <Portal>
        <Dialog visible={confirmationVisible} onDismiss={hideConfirmation}>
          <Dialog.Title>Confirmer la création du client</Dialog.Title>
          <Dialog.Content>
            <Text>Nom: {client?.name}</Text>
            <Text>Email: {client?.email}</Text>
            <Text>Téléphone: {client?.phone}</Text>
            <Text>Type d'adresse: {client?.addressType}</Text>
            <Text>Adresse: {client?.address}</Text>
            <Text>Code postal: {client?.postalCode}</Text>
            <Text>Ville: {client?.city}</Text>
            <Text>Note: {client?.note}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideConfirmation}>Annuler</Button>
            <Button onPress={() => client && handleCreateCustomer(client)}>Confirmer</Button>
          </Dialog.Actions>
        </Dialog>
        <Dialog visible={successMessageVisible} onDismiss={hideSuccessMessage}>
          <Dialog.Title>Client créé avec succès</Dialog.Title>
          <Dialog.Content>
            <Text>Nom: {createdClient.name}</Text>
            <Text>ID: {createdClient.id}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideSuccessMessage}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

export default EditClientModal;
