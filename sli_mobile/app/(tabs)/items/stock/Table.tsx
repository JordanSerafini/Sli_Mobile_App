import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import { StockDocument } from '../../../@types/item.type';

interface TableProps {
    tableHead?: string[]
    Data?: StockDocument[]
}

function Table({ tableHead, Data }: TableProps) {

    const titreColonne = ['Document Number', 'Document Date', 'Dépot', 'Info'];

    const handleIconPress = (documentNumber: string) => {
        Alert.alert(`Info clicked for document number ${documentNumber}`);
    };

    return (
        <ScrollView className='w-full'>
            <View>
                {/* ----------------------------------------------------------------------------------------- Table Header ----------------------------------------------------------------------------- */}
                <View className='flex-row bg-white-perso'>
                    {titreColonne.map((item, index) => {
                        return (
                            <View key={index} className='w-1/4'>
                                <Text className='font-bold text-center'>{item}</Text>
                            </View>
                        )
                    })}
                </View>
                {/* ----------------------------------------------------------------------------------------- Table Data ----------------------------------------------------------------------------- */}
                {Data?.map((item, index) => (
                    <View key={index} className='flex-row bg-white py-4 border-b border-gray-500'>
                        <View className='w-1/4 max-h-14'>
                            <Text className='text-center'>{item.NumberSuffix}</Text>
                        </View>
                        <View className='w-1/4 max-h-14'>
                            <Text className='text-center'>{new Date(item.DocumentDate).toLocaleDateString()}</Text>
                        </View>
                        <View className='w-1/4 max-h-14'>
                            <Text className='text-center'>{item.StorehouseId}</Text>
                        </View>
                        <View className='w-1/4'>
                            <TouchableOpacity onPress={() => handleIconPress(item.NumberSuffix)}>
                                <Icon name="infocirlceo" size={15} color="blue" style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center' }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

export default Table;
