import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  getStockDocLine,
  getStockDocByID,
} from "../../utils/functions/stock_function";
import { StockDocumentLine } from "../../@types/item.type";
import TableDetail from "../../components/item/stock/TableDetail";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";

interface StockDocDetailRouteParams {
  DocumentId: string;
}

const StockDocDetail: React.FC = () => {
  const [stockDocLines, setStockDocLines] = useState<StockDocumentLine[]>([]);
  const [stockDocName, setStockDocName] = useState<string>("");
  const [showInfo, setShowInfo] = useState(false);
  const [stockDoc, setStockDoc] = useState<any>({});

  const navigation = useNavigation();
  const route = useRoute();

  const { DocumentId } = route.params as StockDocDetailRouteParams;

  useEffect(() => {
    const fetchStockDoc = async () => {
      try {
        const data = await getStockDocLine(DocumentId);
        const DocData = await getStockDocByID(DocumentId);
        if (data && data.length > 0) {
          setStockDocLines(data);
        } else {
          console.error("No StockDocumentLines found in the data");
        }

        if (DocData && DocData.length > 0) {
          setStockDoc(DocData[0]);
        } else {
          console.error("No StockDocument found in the data");
        }
      } catch (error) {
        console.error("Error fetching stock document:", error);
      }
    };

    const fetchDocName = async () => {
      try {
        const data = await getStockDocByID(DocumentId);
        if (data) {
          setStockDocName(data[0].DocumentNumber);
          navigation.setOptions({ title: data[0].DocumentNumber });
        } else {
          console.error("No StockDocument found in the data");
        }
      } catch (error) {
        console.error("Error fetching stock document:", error);
      }
    };
    fetchDocName();
    fetchStockDoc();
  }, [DocumentId]);

  return (
    <View className="w-screen h-screen p-4">
      {!showInfo ? (
        <TableDetail
          tableHead={["Article", "Quantité", "Prix HT"]}
          DataLine={stockDocLines}
        />
      ) : (
        <View className="w-full h-7.5/10 ">
          {stockDoc && stockDoc.NotesClear && (
            <View className="flex-row items-start  h-full">
              <Text className="font-bold text-base">Notes du document :</Text>
              <Text className="bg-white h-full w-">{stockDoc.NotesClear}</Text>
            </View>
          )}
          {stockDoc && stockDoc.DescriptionClear && (
            <View className="flex-row items-start  h-full">
              <Text className="font-bold text-base">Stock Description :</Text>
              <Text className="bg-white h-full w-">{stockDoc.DescriptionClear}</Text>
            </View>
          )}
          {stockDoc && stockDoc.Reference && (
            <View className="flex-row items-start  h-full w-10/10">
              <Text className="font-bold text-sm w-2.5/10">Référence :</Text>
              <Text className="bg-white min-h-4/10 w-7.5/10 rounded-xl p-2 border border-gray-300">{stockDoc.Reference}</Text>
            </View>
          )}
        </View>
      )}
      <View className="items-center pt-3">
        <TouchableOpacity onPress={() => setShowInfo(!showInfo)}>
          <Icon name="infocirlce" size={55} color="#1e40af" className="" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StockDocDetail;
