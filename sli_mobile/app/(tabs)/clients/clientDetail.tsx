import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { getCustomerById } from '../../utils/functions/customer_functions';
import { Customer } from '../../@types/customer.type';
import { SafeAreaView } from 'react-native-safe-area-context';

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
        console.error('Error fetching customer:', error);
        setError(error);
        setLoading(false);
      }
    };

    // Conversion de id en nombre
    const numericId = Number(id);
    if (!isNaN(numericId)) {
      fetchCustomer(numericId);
    } else {
      setError(new Error('Invalid customer ID'));
      setLoading(false);
    }
  }, [id, name, navigation]);

  return (
    <SafeAreaView className="w-full h-full">
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text className="text-red-500">Error: {error.message}</Text>
      ) : customer ? (
        <View>
          <Text>ID: {customer.Id}</Text>
          <Text>Name: {customer.Name}</Text>
        </View>
      ) : (
        <Text>No customer found</Text>
      )}
    </SafeAreaView>
  );
};

export default CustomerDetailScreen;
