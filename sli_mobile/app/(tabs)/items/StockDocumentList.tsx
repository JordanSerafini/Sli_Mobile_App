import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getStockDocPaginated } from "../../utils/functions/stock_function";
import Icon from "react-native-vector-icons/AntDesign";
import { StockDocument } from "../../@types/item.type";
import Table from "../../components/item/stock/Table";
import { SafeAreaView } from "react-native-safe-area-context";

function StockDocumentList() {
  const [stockDoc, setStockDoc] = useState<StockDocument[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const [BeDocument, setBeDocument] = useState<StockDocument[]>([]);
  const [showBe, setShowBe] = useState(false);

  const [BsDocument, setBsDocument] = useState<StockDocument[]>([]);
  const [showBs, setShowBs] = useState(false);

  const [BlDocument, setBlDocument] = useState<StockDocument[]>([]);
  const [showBl, setShowBl] = useState(false);

  const [InventoryDocument, setInventoryDocument] = useState<StockDocument[]>(
    []
  );
  const [showInventory, setShowInventory] = useState(false);

  useEffect(() => {
    fetchStockDoc(0); // Initial load
  }, []);

  const fetchStockDoc = async (page: number) => {
    if (loading) return;
    setLoading(true);

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

    setLoading(false);
  };

  const handleShow = (documentType: string) => {
    switch (documentType) {
      case "BE":
        setShowBe(!showBe);
        setShowBs(false);
        setShowBl(false);
        setShowInventory(false);
        break;
      case "BS":
        setShowBs(!showBs);
        setShowBe(false);
        setShowBl(false);
        setShowInventory(false);
        break;
      case "BL":
        setShowBl(!showBl);
        setShowBe(false);
        setShowBs(false);
        setShowInventory(false);
        break;
      case "INV":
        setShowInventory(!showInventory);
        setShowBe(false);
        setShowBs(false);
        setShowBl(false);
        break;
      default:
        break;
    }
  };

  const handleLoadMore = () => {
    if (!loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchStockDoc(nextPage);
    }
  };

  return (
    <SafeAreaView className="w-screen">
      {!showBs && !showBl && !showInventory && (
        <View className="w-9.5/10 self-center pb-2 mb-5 border-b border-blue-800">
          <TouchableOpacity
            className="flex-row w-full justify-between pb-4"
            onPress={() => handleShow("BE")}
          >
            <Text className="text-blue-800 font-bold">Bons entrées :</Text>
            <Icon name="caretdown" size={20} color="#1e40af" />
          </TouchableOpacity>
          {showBe && <Table Data={BeDocument} onEndReached={handleLoadMore} />}
        </View>
      )}
      {!showBe && !showBl && !showInventory && (
        <View className="w-9.5/10 self-center pb-2 mb-5 border-b border-blue-800">
          <TouchableOpacity
            className="flex-row w-full justify-between pb-4"
            onPress={() => handleShow("BS")}
          >
            <Text className="text-blue-800 font-bold">Bons Sorties :</Text>
            <Icon name="caretdown" size={20} color="#1e40af" />
          </TouchableOpacity>
          {showBs && <Table Data={BsDocument} onEndReached={handleLoadMore} />}
        </View>
      )}
      {!showBe && !showBs && !showInventory && (
        <View className="w-9.5/10 self-center pb-2 mb-5 border-b border-blue-800">
          <TouchableOpacity
            className="flex-row w-full justify-between pb-4"
            onPress={() => handleShow("BL")}
          >
            <Text className="text-blue-800 font-bold">Bons livraisons :</Text>
            <Icon name="caretdown" size={20} color="#1e40af" />
          </TouchableOpacity>
          {showBl && <Table Data={BlDocument} onEndReached={handleLoadMore} />}
        </View>
      )}
      {!showBe && !showBs && !showBl && (
        <View className="w-9.5/10 self-center pb-2 mb-5 border-b border-blue-800">
          <TouchableOpacity
            className="flex-row w-full justify-between pb-4"
            onPress={() => handleShow("INV")}
          >
            <Text className="text-blue-800 font-bold">Inventaire :</Text>
            <Icon name="caretdown" size={20} color="#1e40af" />
          </TouchableOpacity>
          {showInventory && (
            <Table Data={InventoryDocument} onEndReached={handleLoadMore} />
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

export default StockDocumentList;
