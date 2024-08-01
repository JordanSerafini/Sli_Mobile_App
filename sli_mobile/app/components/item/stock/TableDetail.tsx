import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { StockDocumentLine } from '../../../@types/item.type';

interface TableProps {
    tableHead: string[];
    DataLine?: StockDocumentLine[];
}

const TableDetail: React.FC<TableProps> = ({ tableHead, DataLine }) => {
    if (!DataLine || !Array.isArray(DataLine)) {
        return <Text>Loading...</Text>;
    }


    return (
        <View className='w-full p-4'>
            {/* Table Header */}
            <View className='flex-row justify-between border-b-2 border-gray-500 py-2'>
                {tableHead.map((head, index) => (
                    <Text key={index} className='w-1/3 text-center font-bold'>{head}</Text>
                ))}
            </View>
            {/* Table Rows */}
            <FlatList
                data={DataLine}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View className='flex flex-row justify-between border-b-2 border-gray-200 py-2'>
                        <Text className='w-1/3 text-center'>{item.Caption}</Text>
                        <Text className='w-1/3 text-center'>{item.Quantity}</Text>
                        <Text className='w-1/3 text-center'>{item.SalePriceVatExcluded}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default TableDetail;
