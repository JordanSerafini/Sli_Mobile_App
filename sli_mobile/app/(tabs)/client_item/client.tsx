import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, TextInput, TouchableOpacity, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { getCustomersPaginated } from '../../utils/functions';
import { Customer } from '../../@types/customer.type';

const ClientScreen: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [limit, setLimit] = useState(25);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

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
    setOffset(0); // Reset offset when a new search is performed
  };

  const handleNextPage = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  const handlePreviousPage = () => {
    setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
  };

  const handleCustomerPress = (id: string | null) => {
    if (id) {
      router.push(`/client_item/clientDetail?id=${id}`);
    }
  };

  return (
    <View className="flex-1 p-4">
      <Text className="text-lg font-bold mb-4">Client Screen</Text>
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
          keyExtractor={(item) => (item.Id ? item.Id.toString() : Math.random().toString())}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCustomerPress(item.id as string)}>
              <View className="p-4 border-b border-gray-200">
                <Text>{item.Name ?? 'Unknown'}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      <View className="flex-row justify-between items-center mt-4">
        <Button title="Previous" onPress={handlePreviousPage} disabled={offset === 0} />
        <Text>
          Page {offset / limit + 1} of {totalPages}
        </Text>
        <Button title="Next" onPress={handleNextPage} disabled={offset + limit >= totalCustomers} />
      </View>
    </View>
  );
};

export default ClientScreen;
