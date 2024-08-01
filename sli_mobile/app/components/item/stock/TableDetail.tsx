import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { StockDocumentLine } from '../../../@types/item.type';

interface TableProps {
    tableHead: string[];
    DataLine?: StockDocumentLine[];
}

const TableDetail: React.FC<TableProps> = ({ tableHead, DataLine }) => {

    console.log(DataLine);

    return (
        <View className='w-full p-4'>
            {/* Affichage de l'en-tête de la table */}
            <View className='flex-row justify-between border-b-2 border-gray-500 py-2'>
                {tableHead.map((head, index) => (
                    <Text key={index} className='w-1/4 text-center font-bold'>{head}</Text>
                ))}
            </View>
            {/* Affichage des données de la ligne */}
            {DataLine && DataLine.map((data, index) => (
                <View key={index} className='flex flex-row justify-between border-b-2 border-gray-200 py-2'>
                    <Text className='w-1/4 text-center'>{data.Item.Name}</Text>
                    <Text className='w-1/4 text-center'>{data.Quantity}</Text>
                    <Text className='w-1/4 text-center'>{data.Item.Prix_HT}</Text>
                    <Text className='w-1/4 text-center'>{data.Item.Prix_TTC}</Text>
                </View>
            ))}
        </View>
    );
};

export default TableDetail;
