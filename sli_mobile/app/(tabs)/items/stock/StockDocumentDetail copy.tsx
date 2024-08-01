import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { getStockDocByID } from '../../../utils/functions/stock_function';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';

function StockDocumentDetail() {
  const [stockDoc, setStockDoc] = useState(null);
  const [state, setState] = useState({
    tableHead: ['Id', 'Article', 'Prix HT'],
    tableData: []
  });

  useEffect(() => {
    const fetchStockDoc = async () => {
      const data = await getStockDocByID('deb5ccaf-5574-4175-a0ee-ce453e3732e3');
      //console.log(data[0].StockDocumentLines);
      setStockDoc(data[0]);
      if (data[0] && data[0].StockDocumentLines) {
        mapDataToTable(data[0]);
      }
    };

    fetchStockDoc();
  }, []);

  const mapDataToTable = (data: any) => {
    const tableData = data.StockDocumentLines.map((line: { ItemId: any; Item: any; PriceHT: { toString: () => any; }; }) => [
      line.ItemId,
      line.Item.Name,
      line.Item.PriceHT ? line.PriceHT.toString() : '0'
    ]);
    setState(prevState => ({
      ...prevState,
      tableData: tableData
    }));
  };

  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 1 }}>
        <Row data={state.tableHead} flexArr={[2, 4, 2]} style={styles.head} textStyle={styles.text} />
        <TableWrapper style={styles.wrapper}>
          <Rows data={state.tableData} flexArr={[2, 4, 2]} style={styles.row} textStyle={styles.text} />
        </TableWrapper>
      </Table>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  title: { fontSize: 20, textAlign: 'center', marginBottom: 20 },
  head: { height: 40, backgroundColor: '#f1f8ff', fontSize: 10 },
  wrapper: { flexDirection: 'row' },
  row: { height: 80, backgroundColor: '#f6f8fa', fontSize: 4 },
  text: { textAlign: 'center' }
});

export default StockDocumentDetail;
