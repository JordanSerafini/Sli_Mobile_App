import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { getStockDocByID } from '../../../utils/functions/stock_function'

function StockDocumentDetail() {

  const [stockDoc, setStockDoc] = useState(null);

  useEffect(() => {
    const fetchStockDoc = async () => {
      const data = await getStockDocByID('deb5ccaf-5574-4175-a0ee-ce453e3732e3');
      setStockDoc(data);
    };

    fetchStockDoc();
  }
  , []);

  return (
    <View>
        
    </View>
  )
}

export default StockDocumentDetail