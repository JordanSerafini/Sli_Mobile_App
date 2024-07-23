import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { getCustomerById } from "../../utils/functions/customer_functions";
import { Customer } from "../../@types/customer.type";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import MapView, { Marker } from "react-native-maps";

const CustomerDetailScreen: React.FC = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const { id, name } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    if (name) {
      navigation.setOptions({ title: `${name}` });
    }

    const fetchCustomer = async (id: number) => {
      setLoading(true);
      try {
        const data = await getCustomerById(id);
        setCustomer(data);
        //console.log('Customer data:', data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customer:", error);
        setError(error);
        setLoading(false);
      }
    };

    // Conversion de id en nombre
    const numericId = Number(id);
    if (!isNaN(numericId)) {
      fetchCustomer(numericId);
    } else {
      setError(new Error("Invalid customer ID"));
      setLoading(false);
    }
  }, [id, name, navigation]);

  const amountColor = (amount: number) => {
    if (amount > 0) {
      return "text-green-500";
    } else if (amount < 0) {
      return "text-red-500";
    } else {
      return "text-gray-500";
    }
  };

  return (
    <SafeAreaView className="w-full h-full items-center">
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text className="text-red-500">Error: {error.message}</Text>
      ) : customer ? (
        <View className="gap-4 w-9.5/10 items-center">
          {/*<Text className="text-lg font-bold">{customer.Id}</Text> */}
          <Text className="text-xl italic">
            <Text>{customer.MainInvoicingContact_FirstName} </Text>
            <Text>{customer.MainInvoicingContact_Name}</Text>
          </Text>
          {customer.MainInvoicingContact_Email ? (
            <View className="flex-row self-start gap-2 ">
              <Icon name="mail" size={24} color="#3B82F6" />
              <Text>{customer.MainInvoicingContact_Email}</Text>
            </View>
          ) : (
            <Text>Pas d'email renseigné</Text>
          )}
          <View className="flex-row justify-between w-full">
            {customer.CurrentAmount && (
              <View className="flex-row items-center gap-1">
                <Text>Compte courant :</Text>
                <Text className={amountColor(customer.CurrentAmount)}>
                  {customer.CurrentAmount}
                </Text>
              </View>
            )}
            {customer.Civility && (
              <View className=" ">
                <Text className="font-bold text-white bg-green-800 px-4 py-2 rounded-full">
                  {customer.Civility}
                </Text>
              </View>
            )}
          </View>
          {customer.NotesClear && (
          <ScrollView className="w-full max-h-3/10 p-4 rounded-xl bg-white">
           <Text>{customer.NotesClear}</Text> 
          </ScrollView>
          )}

          {customer.Lat && customer.Lon ? (

          <MapView
            style={{ width: "100%", height: 250 }}
            initialRegion={{
              latitude: Number(customer.Lat),
              longitude: Number(customer.Lon),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: Number(customer.Lat),
                longitude: Number(customer.Lon),
              }}
              title={customer?.Name ?? ''}
              description={customer?.MainDeliveryAddress_Address1 ?? ''}
            />
          </MapView>
          ): (
            <Text>Pas d'adresse a afficher</Text>
          )
        
        }

        </View>
      ) : (
        <Text>No customer found</Text>
      )}
    </SafeAreaView>
  );
};

export default CustomerDetailScreen;
