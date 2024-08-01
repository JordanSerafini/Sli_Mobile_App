import React from 'react'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native';

interface TableProps {
    tableHead: string[]
    tableData: string[][]
    }

function Table() {

        const titreColonne = ['Document Number', 'Document Date', 'Dépot', 'Info'];
        const data = [
            ['1', '2021-09-01', 'Depot 1'],
            ['2', '2021-09-02', 'Depot 2'],
            ['3', '2021-09-03', 'Depot 3'],
            ['4', '2021-09-04', 'Depot 4'],
            ['5', '2021-09-05', 'Depot 5'],
        ];
    
  return (
    <ScrollView className='w-full'>
        <View>dd</View>
    </ScrollView>
  )
}

export default Table