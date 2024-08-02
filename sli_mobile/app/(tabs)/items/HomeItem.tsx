import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Dimensions, ActivityIndicator } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import ButtonPerso from "../../components/UI/ButtonPerso";
import { getStockDocWithinDateRange } from "../../utils/functions/stock_function";

interface StockDocument {
  id: string;
  name: string;
  DocumentDate: string;
  urgency?: string;
}

interface HomeItemProps {
  onItemClick: () => void;
  onStockClick: () => void;
}

const HomeItem: React.FC<HomeItemProps> = ({ onItemClick, onStockClick }) => {
  const [stockDocuments, setStockDocuments] = useState<StockDocument[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const width = Dimensions.get("window").width;

  const formatDateToMidnight = (date: Date): string => {
    date.setHours(0, 0, 0, 0);
    return date.toISOString().split('T')[0] + 'T00:00:00';
  };

  useEffect(() => {
    const fetchStockDocuments = async () => {
      try {
        const endDate = formatDateToMidnight(new Date());
        const startDate = formatDateToMidnight(new Date(new Date().setDate(new Date().getDate() - 30)));
        const data = await getStockDocWithinDateRange(startDate, endDate);
        setStockDocuments(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des documents de stock:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockDocuments();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 p-4">
      <View className="mb-4">
        <Text className="text-lg font-bold mb-2">Articles:</Text>
        <ButtonPerso
          mode="outlined"
          icon="account"
          text="Liste des articles"
          css="w-4.5/10 self-center"
          onPress={onItemClick}
        />
      </View>

      <View className="mb-4">
        <Text className="text-lg font-bold mb-2">Derniers documents de stock :</Text>
        <Carousel
          loop
          width={width}
          height={width / 2}
          autoPlay
          data={stockDocuments}
          scrollAnimationDuration={1000}
          renderItem={({ item, index }) => (
            <View
              key={index}
              className="rounded-lg p-4 mb-2"
            >
              
              <Text className="text-gray-600">{new Date(item.DocumentDate).toLocaleDateString()}</Text>
            </View>
          )}
        />
      </View>

      <ButtonPerso
        mode="outlined"
        icon="account"
        text="STOCK"
        css="w-4.5/10 self-center"
        onPress={onStockClick}
      />
    </SafeAreaView>
  );
};

export default HomeItem;
