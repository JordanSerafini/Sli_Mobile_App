import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getCustomerById } from '../../utils/functions';
import { Customer } from '../../@types/customer.type';

const CustomerDetailScreen: React.FC = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true);
      try {
        const data = await getCustomerById(id as string);
        setCustomer(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  return (
    <View className="flex items-center justify-center w-full h-full">
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text className="text-red-500">Error: {error.message}</Text>
      ) : customer ? (
        <View>
          <Text className="text-lg font-bold mb-2">Customer Details</Text>
          <Text>ID: {customer.Id}</Text>
          <Text>Name: {customer.Name}</Text>
          {/* Add other customer fields here */}
        </View>
      ) : (
        <Text>No customer found</Text>
      )}
    </View>
  );
};

export default CustomerDetailScreen;
