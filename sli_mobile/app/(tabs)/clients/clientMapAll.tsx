import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getAllCustomers } from "../../utils/functions/customer_functions";

function MapClientScreen() {
  const [customersCoordinates, setCustomersCoordinates] = useState<any[]>([]);

  const fetchCustomers = async () => {
    try {
      const data = await getAllCustomers();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomersCoordinates = async () => {
    const customers = await fetchCustomers();
    const coordinates = customers.map((customer: any) => {
      return {
        latitude: customer.Lat,
        longitude: customer.Lon,
      };
    });
    console.log(coordinates);
    setCustomersCoordinates(coordinates);
  }
    useEffect(() => {
        getCustomersCoordinates();
    }, []);

  return (
    <View>
      <Text>Map</Text>
    </View>
  );
}

export default MapClientScreen;
