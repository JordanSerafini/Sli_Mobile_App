import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { getStockDocLine } from "../../utils/functions/stock_function";
import { StockDocument, StockDocumentLine } from "../../@types/item.type";
import { useRoute, useNavigation } from "@react-navigation/native";
import TableDetail from "../../components/item/stock/TableDetail";

interface StockDocDetailRouteParams {
  DocumentId: string;
}

const StockDocDetail: React.FC = () => {
  const [docLine, setDocLine] = useState<StockDocumentLine[]>([]);
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
        setDocLine(data); 
      } catch (error) {
        console.error("Error fetching stock document:", error);
      }
    };

    fetchStockDoc();
  }, [DocumentId]);

  if (!docLine) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <TableDetail tableHead={["Article", "Quantité", "Prix", "Total"]} DataLine={docLine} />
    </View>
  );
};

export default StockDocDetail;
