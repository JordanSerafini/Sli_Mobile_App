import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { getAllCustomers } from "../../utils/functions/customer_functions";
import { Customer } from "../../@types/customer.type";

function MapClientScreen() {
  const [customersCoordinates, setCustomersCoordinates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
    const coordinates = customers
      .filter((customer: Customer) => customer.Lat !== null && customer.Lon !== null)
      .map((customer: Customer) => {
        return {
          latitude: customer.Lat,
          longitude: customer.Lon,
          name: customer.Name, 
        };
      });
    setCustomersCoordinates(coordinates);
    setLoading(false);
  };

  useEffect(() => {
    getCustomersCoordinates();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: customersCoordinates.length > 0 ? customersCoordinates[0].latitude : 37.78825,
            longitude: customersCoordinates.length > 0 ? customersCoordinates[0].longitude : -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {customersCoordinates.map((coordinate, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
              }}
              title={coordinate.name}
            />
          ))}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapClientScreen;
