import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
  Button,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";
import { getCustomersPaginated } from "../../utils/functions";
import { Customer } from "../../@types/customer.type";
import { SafeAreaView } from "react-native-safe-area-context";
import { Menu, Provider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

const ClientScreen: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(25);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedPhones, setSelectedPhones] = useState<string[]>([]);
  const [menuAnchor, setMenuAnchor] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const router = useRouter();

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const data = await getCustomersPaginated(searchQuery, limit, offset);
        setCustomers(data.customers);
        setTotalPages(data.totalPages);
        setTotalCustomers(data.totalCustomer);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchCustomers();
  }, [searchQuery, limit, offset]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setOffset(0);
  };

  const handleNextPage = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  const handlePreviousPage = () => {
    setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
  };

  const handleCustomerPress = (customer: Customer) => {
    if (customer.id) {
      router.push({
        pathname: "/client_item/clientDetail",
        params: { id: customer.id, name: customer.Name },
      });
    }
  };

  const handlePhonePress = (phones: string[], event: any) => {
    if (phones.length === 1) {
      Linking.openURL(`tel:${phones[0]}`);
    } else {
      setSelectedPhones(phones);
      setMenuAnchor({ x: event.nativeEvent.pageX, y: event.nativeEvent.pageY });
      setMenuVisible(true);
    }
  };

  const getUniquePhones = (customer: Customer): string[] => {
    const phones = [
      customer.MainDeliveryContact_Phone,
      customer.MainInvoicingContact_Phone,
      customer.MainInvoicingContact_Cellphone,
      customer.MainDeliveryContact_CellPhone,
    ].filter(phone => phone !== null) as string[];
  
    return Array.from(new Set(phones));
  };

  return (
    <Provider>
      <SafeAreaView className="flex-1 p-4">
        <TextInput
          className="h-10 border border-gray-300 mb-4 px-2"
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search"
        />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text className="text-red-500">Error: {error.message}</Text>
        ) : (
          <FlatList
            data={customers}
            keyExtractor={(item) =>
              item.id ? item.id.toString() : Math.random().toString()
            }
            renderItem={({ item }) => (
              <View className="p-4 border-b border-gray-200 flex flex-row justify-between">
                <TouchableOpacity onPress={() => handleCustomerPress(item)}>
                  <Text>{item.Name ?? "Unknown"}</Text>
                </TouchableOpacity>
                {getUniquePhones(item).length > 0 && (
                  <TouchableOpacity
                    onPress={(event) =>
                      handlePhonePress(getUniquePhones(item), event)
                    }
                  >
                    <Icon name="phone" size={24} color="blue" />
                  </TouchableOpacity>
                )}
              </View>
            )}
          />
        )}
        <View className="flex-row justify-between items-center mt-4">
          <Button
            title="Previous"
            onPress={handlePreviousPage}
            disabled={offset === 0}
          />
          <Text>
            Page {offset / limit + 1} of {totalPages}
          </Text>
          <Button
            title="Next"
            onPress={handleNextPage}
            disabled={offset + limit >= totalCustomers}
          />
        </View>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={menuAnchor}
        >
          {selectedPhones.map((phone, index) => (
            <Menu.Item
              key={index}
              onPress={() => {
                setMenuVisible(false);
                Linking.openURL(`tel:${phone}`);
              }}
              title={phone}
            />
          ))}
        </Menu>
      </SafeAreaView>
    </Provider>
  );
};

export default ClientScreen;
