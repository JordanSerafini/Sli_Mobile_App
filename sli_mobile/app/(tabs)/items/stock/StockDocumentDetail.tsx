import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { getStockDocPaginated } from '../../../utils/functions/stock_function';
import Icon from "react-native-vector-icons/AntDesign";

import { StockDocument } from '../../../@types/item.type';
import Table from './Table';

function StockDocumentDetail() {
  const [stockDoc, setStockDoc] = useState<StockDocument[]>([]);

  const [BeDocument, setBeDocument] = useState([]);
  const [showBe, setShowBe] = useState(false);

  const [BsDocument, setBsDocument] = useState([]);
  const [BlDocument, setBlDocument] = useState([]);
  const [InventoryDocument, setInventoryDocument] = useState([]);

  const [beTableState, setBeTableState] = useState({
    tableHead: ['Document Number', 'Document Date', 'Dépot', 'Info'],
    tableData: []
  });

  const [bsTableState, setBsTableState] = useState({
    tableHead: ['Document Number', 'Document Date', 'Dépot'],
    tableData: []
  });

  const [blTableState, setBlTableState] = useState({
    tableHead: ['Document Number', 'Document Date', 'Dépot'],
    tableData: []
  });

  useEffect(() => {
    const fetchStockDoc = async () => {
      const data = await getStockDocPaginated(50, 0, "");
      const BeDoc = data.StockDoc.filter((line: { NumberPrefix: string; }) => line.NumberPrefix === 'BE');
      setBeDocument(BeDoc);

      const BsDoc = data.StockDoc.filter((line: { NumberPrefix: string; }) => line.NumberPrefix === 'BS');
      setBsDocument(BsDoc);

      const BlDoc = data.StockDoc.filter((line: { NumberPrefix: string; }) => line.NumberPrefix === 'BL');
      setBlDocument(BlDoc);
    };

    fetchStockDoc();
  }, []);

  const handleShowBe = () => {
    setShowBe(!showBe);
  }

  
  return (
    <ScrollView className='h-screen w-screen '>
      < View className='w-9.5/10 self-center'>
      < TouchableOpacity className='flex-row w-full justify-between' onPress={handleShowBe}>
        <Text >Bons entrées :</Text>
        < Icon name="caretdown" size={20} color="black" />
        </TouchableOpacity>
        {showBe && (
          < Table  />
        )}  
        
      </View>
    </ScrollView>
  );
}



export default StockDocumentDetail;
