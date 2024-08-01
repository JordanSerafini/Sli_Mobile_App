import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getStockDocLine } from "../../utils/functions/stock_function";
import { StockDocumentLine } from "../../@types/item.type";
import TableDetail from "../../components/item/stock/TableDetail";
import { useRoute, useNavigation } from "@react-navigation/native";

interface StockDocDetailRouteParams {
  DocumentId: string;
}

const StockDocDetail: React.FC = () => {
  const [stockDocLines, setStockDocLines] = useState<StockDocumentLine[]>([]);
  const navigation = useNavigation();
  const route = useRoute();

  const { DocumentId } = route.params as StockDocDetailRouteParams;

  useEffect(() => {
    navigation.setOptions({ title: DocumentId });
  }, [DocumentId, navigation]);

  useEffect(() => {
    const fetchStockDoc = async () => {
      try {
        const data = await getStockDocLine(DocumentId);
        if (data && data.length > 0) {
          setStockDocLines(data); 
        } else {
          console.error("No StockDocumentLines found in the data");
        }
      } catch (error) {
        console.error("Error fetching stock document:", error);
      }
    };

    fetchStockDoc();
  }, [DocumentId]);

  return (
    <View className="w-full p-4">
      <TableDetail 
        tableHead={["Article", "Quantité", "Prix HT"]} 
        DataLine={stockDocLines} 
      />
    </View>
  );
};

export default StockDocDetail;
