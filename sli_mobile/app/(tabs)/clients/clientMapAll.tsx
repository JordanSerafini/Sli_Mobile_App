import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { getAllCustomers } from "../../utils/functions/customer_functions";
import { Customer } from "../../@types/customer.type";

// Fonction pour calculer la distance entre deux points (latitude/longitude) en kilomètres
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Rayon de la Terre en kilomètres
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

function MapClientScreen() {
  const [customersCoordinates, setCustomersCoordinates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | unknown>(null);
  const [searchLat, setSearchLat] = useState(45.8995); 
  const [searchLon, setSearchLon] = useState(6.1286); 
  const [citySearch, setCitySearch] = useState('');

  const fetchCustomers = async () => {
    try {
      const data = await getAllCustomers();
      console.log('Fetched customers:', data);
      return data;
    } catch (error) {
      console.log('Error fetching customers:', error);
      setError(error);
      return [];
    }
  };

  const getCustomersCoordinates = async () => {
    const customers = await fetchCustomers();
    const coordinates = customers
      .filter((customer: any) => {
        const isValid = customer.Lat !== null && customer.Lon !== null;
        if (!isValid) {
          console.log('Invalid coordinates for customer:', customer);
        }
        return isValid;
      })
      .map((customer: any) => {
        return {
          latitude: parseFloat(customer.Lat),
          longitude: parseFloat(customer.Lon),
          name: customer.Name,
        };
      })
      .filter((customer: any) => {
        // Filtrer les clients à moins de 100 km de l'adresse recherchée
        const distance = calculateDistance(
          searchLat,
          searchLon,
          customer.latitude,
          customer.longitude
        );
        const isWithinRange = distance <= 0.5;
        if (!isWithinRange) {
          console.log('Customer out of range:', customer, 'Distance:', distance);
        }
        return isWithinRange;
      });
    setCustomersCoordinates(coordinates);
    setLoading(false);
  };

  useEffect(() => {
    getCustomersCoordinates();
  }, []);

  if (loading) {
    return (
        <View className="z-50 w-screen h-screen">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (customersCoordinates.length === 0) {
    return (
        <View className="z-50 w-screen h-screen">
        <Text>No coordinates available</Text>
      </View>
    );
  }

  return (
    <View className="z-50 w-screen h-screen">
        <View className="h-10 w-9.5/10 items-center bg-gray-200 mb-2">
          {/*----------------------------------------------------------------------- Search input ------------------------------------------------------------------*/}
          <TextInput
            className="h-10/10 w-full px-2 "
            value={citySearch}
            placeholder="Search"
          />
        </View>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: searchLat,
          longitude: searchLon,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
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
    </View>
  );
}



export default MapClientScreen;
