import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { getCustomersCluster } from "../../utils/functions/customer_functions";
import { Customer } from "../../@types/customer.type";
import { Banner } from "react-native-paper";
import { Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

function MapClientScreen() {
  const [customersCoordinates, setCustomersCoordinates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | unknown>(null);
  const [searchLat, setSearchLat] = useState(45.8995);
  const [searchLon, setSearchLon] = useState(6.1286);
  const [rayon, setRayon] = useState(1000);
  const [citySearch, setCitySearch] = useState("");
  const [bannerVisible, setBannerVisible] = useState(false);

  useEffect(() => {
    getCustomersCluster(searchLat, searchLon, rayon)
      .then((customers: Customer[]) => {
        const coordinates = customers.map((customer) => ({
          latitude: customer.Lat,
          longitude: customer.Lon,
          name: customer.Name,
        }));
        setCustomersCoordinates(coordinates);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [rayon]);

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
    <View className="w-screen h-screen items-center z-50">
      {bannerVisible == true && (
        <Banner
          visible={bannerVisible}
          actions={[
            {
              label: "Fix it",
              onPress: () => setBannerVisible(false),
            },
            {
              label: "Learn more",
              onPress: () => setBannerVisible(false),
            },
          ]}
          icon={({ size }) => (
            <Image
              source={{
                uri: "https://avatars3.githubusercontent.com/u/17571969?s=400&v=4",
              }}
              style={{
                width: size,
                height: size,
              }}
            />
          )}
        >
          There was a problem processing a transaction on your credit card.
        </Banner>
      )}
      <View className="h-10 w-9.5/10 items-center  mb-2">
        {/*----------------------------------------------------------------------- Search input ------------------------------------------------------------------*/}
        <TextInput
          className="h-10/10 w-full px-2 bg-gray-200"
          value={citySearch}
          placeholder="Search"
        />
        <Icon name="phone" size={32} color="#3B82F6" className="bg-red-500" />
      </View>
      <MapView
        className="w-9.5/10 h-9/10"
        initialRegion={{
          latitude: searchLat,
          longitude: searchLon,
          latitudeDelta: 0.025,
          longitudeDelta: 0.025,
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
