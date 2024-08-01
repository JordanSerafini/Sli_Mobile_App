import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { getStockDocPaginated } from "../../../utils/functions/stock_function";
import Icon from "react-native-vector-icons/AntDesign";

import { StockDocument } from "../../../@types/item.type";
import Table from "./Table";

function StockDocumentDetail() {
  const [stockDoc, setStockDoc] = useState<StockDocument[]>([]);

  const [BeDocument, setBeDocument] = useState([]);
  const [showBe, setShowBe] = useState(false);

  const [BsDocument, setBsDocument] = useState([]);
  const [showBs, setShowBs] = useState(false);

  const [BlDocument, setBlDocument] = useState([]);
  const [showBl, setShowBl] = useState(false);

  const [InventoryDocument, setInventoryDocument] = useState([]);
  const [showInventory, setShowInventory] = useState(false);

  const [beTableState, setBeTableState] = useState({
    tableHead: ["Document Number", "Document Date", "Dépot", "Info"],
    tableData: [],
  });

  const [bsTableState, setBsTableState] = useState({
    tableHead: ["Document Number", "Document Date", "Dépot"],
    tableData: [],
  });

  const [blTableState, setBlTableState] = useState({
    tableHead: ["Document Number", "Document Date", "Dépot"],
    tableData: [],
  });

  useEffect(() => {
    const fetchStockDoc = async () => {
      const data = await getStockDocPaginated(50, 0, "");
      const BeDoc = data.StockDoc.filter(
        (line: { NumberPrefix: string }) => line.NumberPrefix === "BE"
      );
      setBeDocument(BeDoc);

      const BsDoc = data.StockDoc.filter(
        (line: { NumberPrefix: string }) => line.NumberPrefix === "BS"
      );
      setBsDocument(BsDoc);

      const BlDoc = data.StockDoc.filter(
        (line: { NumberPrefix: string }) => line.NumberPrefix === "BL"
      );
      setBlDocument(BlDoc);

      const InventoryDoc = data.StockDoc.filter(
        (line: { NumberPrefix: string }) => line.NumberPrefix == "INV"
      );
      setInventoryDocument(InventoryDoc);
    };

    fetchStockDoc();
  }, []);

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

  return (
    <ScrollView className="h-screen w-screen ">
      <View className="w-9.5/10 self-center pb-4">
        <TouchableOpacity
          className="flex-row w-full justify-between  pb-4"
          onPress={() => handleShow("BE")}
        >
          <Text className="text-gray-800 font-bold ">Bons entrées :</Text>
          <Icon name="caretdown" size={20} color="#1e40af" />
        </TouchableOpacity>
        {showBe && <Table Data={BeDocument} />}
      </View>

      <View className="w-9.5/10 self-center pb-4">
        <TouchableOpacity
          className="flex-row w-full justify-between pb-4"
          onPress={() => handleShow("BS")}
        >
          <Text className="text-gray-800 font-bold ">Bons Sorties :</Text>
          <Icon name="caretdown" size={20} color="#1e40af" />
        </TouchableOpacity>
        {showBs && <Table Data={BsDocument} />}
      </View>

      <View className="w-9.5/10 self-center pb-4">
        <TouchableOpacity
          className="flex-row w-full justify-between pb-4"
          onPress={() => handleShow("INV")}
        >
          <Text className="text-gray-800 font-bold ">Inventaire :</Text>
          <Icon name="caretdown" size={20} color="#1e40af" />
        </TouchableOpacity>
        {showInventory && <Table Data={InventoryDocument} />}
      </View>
    </ScrollView>
  );
}

export default StockDocumentDetail;
