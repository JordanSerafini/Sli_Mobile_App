import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";
import { getCustomersPaginated } from "../../utils/functions/customer_functions";
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
        pathname: "/clients/clientDetail",
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

  return (
    <Provider>
      <SafeAreaView className="flex-1 p-4 gap-2">
        <TextInput
          className="h-0.5/10 border border-gray-300 mb-4 px-2"
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search"
        />
        {loading ? (
          <View className="h-8/10 flex items-center justify-center w-full gap-2 flex-row">
            <Text>Loading...</Text>
          <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : error ? (
          <Text className="text-red-500">Error: {error.message}</Text>
        ) : (
          <FlatList
            data={customers}
            className="h-8/10 min-h-8/10"
            keyExtractor={(item) =>
              item.Id ? item.Id.toString() : Math.random().toString()
              
            }
            renderItem={({ item }) => (
              <View className="p-4 border-b border-gray-200 flex flex-row justify-between">
                <TouchableOpacity onPress={() => handleCustomerPress(item)}>
                  <Text>{item.Name ?? "Unknown"}</Text>
                </TouchableOpacity>
                {(item.MainDeliveryContact_Phone ||
                  item.MainInvoicingContact_Phone ||
                  item.MainInvoicingContact_Cellphone ||
                  item.MainDeliveryContact_CellPhone) && (
                  <TouchableOpacity
                    onPress={(event) =>
                      handlePhonePress(
                        [
                          item.MainDeliveryContact_Phone,
                          item.MainInvoicingContact_Phone,
                          item.MainInvoicingContact_Cellphone,
                          item.MainDeliveryContact_CellPhone,
                        ].filter(Boolean) as string[],
                        event
                      )
                    }
                  >
                    <Icon name="phone" size={24} color="blue" />
                  </TouchableOpacity>
                )}
              </View>
            )}
          />
        )}
        {/*----------------------------------------------------------------------- NAV ------------------------------------------------------------------*/}
        <View className="flex-row justify-between items-center border-t border-gray-700 h-1/10">
          <TouchableOpacity
            onPress={handlePreviousPage}
            disabled={offset === 0}
            style={{ opacity: offset === 0 ? 0.5 : 1 }}
          >
            <View className="bg-blue-700 rounded-full p-">
              <Icon
                name="arrow-left"
                size={30}
                color={offset === 0 ? "gray" : "white"}
              />
            </View>
          </TouchableOpacity>
          <Text>
            Page {offset / limit + 1} / {totalPages}
          </Text>
          <TouchableOpacity
            onPress={handleNextPage}
            disabled={offset + limit >= totalCustomers}
            style={{ opacity: offset + limit >= totalCustomers ? 0.5 : 1 }}
          >
            <View className="bg-blue-700 rounded-full p-">
              <Icon
                name="arrow-right"
                size={30}
                color={offset + limit >= totalCustomers ? "gray" : "white"}
              />
            </View>
          </TouchableOpacity>
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
