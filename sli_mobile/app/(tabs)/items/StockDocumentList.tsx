import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getStockDocPaginated } from "../../utils/functions/stock_function";
import Icon from "react-native-vector-icons/AntDesign";
import { StockDocument } from "../../@types/item.type";
import Table from "../../components/item/stock/Table";
import { SafeAreaView } from "react-native-safe-area-context";

function StockDocumentDetail() {
  const [stockDoc, setStockDoc] = useState<StockDocument[]>([]);
  const [page, setPage] = useState(0);

  const [BeDocument, setBeDocument] = useState<StockDocument[]>([]);
  const [showBe, setShowBe] = useState(false);

  const [BsDocument, setBsDocument] = useState<StockDocument[]>([]);
  const [showBs, setShowBs] = useState(false);

  const [BlDocument, setBlDocument] = useState<StockDocument[]>([]);
  const [showBl, setShowBl] = useState(false);

  const [InventoryDocument, setInventoryDocument] = useState<StockDocument[]>([]);
  const [showInventory, setShowInventory] = useState(false);

  useEffect(() => {
    fetchStockDoc(0); // Initial load
  }, []);

  const fetchStockDoc = async (page: number) => {
    const data = await getStockDocPaginated(50, page, "");
    const BeDoc = data.StockDoc.filter(
      (line: { NumberPrefix: string }) => line.NumberPrefix == "BE"
    );
    setBeDocument((prev) => [...prev, ...BeDoc]);

    const BsDoc = data.StockDoc.filter(
      (line: { NumberPrefix: string }) => line.NumberPrefix == "BS"
    );
    setBsDocument((prev) => [...prev, ...BsDoc]);

    const BlDoc = data.StockDoc.filter(
      (line: { NumberPrefix: string }) => line.NumberPrefix == "BL"
    );
    setBlDocument((prev) => [...prev, ...BlDoc]);

    const InventoryDoc = data.StockDoc.filter(
      (line: { NumberPrefix: string }) => line.NumberPrefix == "INV"
    );
    setInventoryDocument((prev) => [...prev, ...InventoryDoc]);
  };

  const handleShow = (documentType: string) => {
    switch (documentType) {
      case "BE":
        setShowBe(!showBe);
        break;
      case "BS":
        setShowBs(!showBs);
        break;
      case "BL":
        setShowBl(!showBl);
        break;
      case "INV":
        setShowInventory(!showInventory);
        break;
      default:
        break;
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchStockDoc(nextPage);
  };

  return (
    <SafeAreaView className="w-screen">
      <View className="w-9.5/10 self-center">
        <TouchableOpacity
          className="flex-row w-full justify-between pb-4"
          onPress={() => handleShow("BE")}
        >
          <Text className="text-gray-800 font-bold">Bons entrées :</Text>
          <Icon name="caretdown" size={20} color="#1e40af" />
        </TouchableOpacity>
        {showBe && <Table Data={BeDocument} onEndReached={handleLoadMore} />}
      </View>

      <View className="w-9.5/10 self-center">
        <TouchableOpacity
          className="flex-row w-full justify-between pb-4"
          onPress={() => handleShow("BS")}
        >
          <Text className="text-gray-800 font-bold">Bons Sorties :</Text>
          <Icon name="caretdown" size={20} color="#1e40af" />
        </TouchableOpacity>
        {showBs && <Table Data={BsDocument} onEndReached={handleLoadMore} />}
      </View>

      <View className="w-9.5/10 self-center">
        <TouchableOpacity
          className="flex-row w-full justify-between pb-4"
          onPress={() => handleShow("INV")}
        >
          <Text className="text-gray-800 font-bold">Inventaire :</Text>
          <Icon name="caretdown" size={20} color="#1e40af" />
        </TouchableOpacity>
        {showInventory && (
          <Table Data={InventoryDocument} onEndReached={handleLoadMore} />
        )}
      </View>
    </SafeAreaView>
  );
}

export default StockDocumentDetail;
