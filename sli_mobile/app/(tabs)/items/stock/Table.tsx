import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import { StockDocument } from '../../../@types/item.type';
import { getStorehouseNameById } from '../../../utils/functions/stock_function';

interface TableProps {
    tableHead?: string[]
    Data?: StockDocument[]
    colWidth?: string[]
    columnTitle?: string[]
}

function Table({ tableHead, Data, colWidth, columnTitle }: TableProps) {

    const defaultColumnTitle = ['Document Number', 'Document Date', 'Dépot', 'Info'];
    const defaultColumnWidths = ['w-3/10', 'w-3/10', 'w-3/10', 'w-1/10'];

    const [columnWidths, setColumnWidths] = useState(defaultColumnWidths);
    const [columnTitles, setColumnTitles] = useState(defaultColumnTitle);
    const [storehouseNames, setStorehouseNames] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (colWidth) {
            setColumnWidths(colWidth);
        }
        if (columnTitle) {
            setColumnTitles(columnTitle);
        }
    }, [colWidth, columnTitle]);

    useEffect(() => {
        const fetchStorehouseNames = async () => {
            const names: { [key: string]: string } = {};
            for (const doc of Data || []) {
                if (!names[doc.StorehouseId]) {
                    names[doc.StorehouseId] = await getStorehouseNameById(doc.StorehouseId);
                }
            }
            setStorehouseNames(names);
        };

        fetchStorehouseNames();
    }, [Data]);

    const handleIconPress = (documentNumber: string) => {
        Alert.alert(`Info clicked for document number ${documentNumber}`);
    };

    return (
        <ScrollView className='w-full'>
            <View>
                {/* ----------------------------------------------------------------------------------------- Table Header ----------------------------------------------------------------------------- */}
                <View className='flex-row bg-white-perso'>
                    {columnTitles.map((item, index) => (
                        <View key={index} className={columnWidths[index]}>
                            <Text className='font-bold text-center'>{item}</Text>
                        </View>
                    ))}
                </View>
                {/* ----------------------------------------------------------------------------------------- Table Data ----------------------------------------------------------------------------- */}
                {Data?.map((item, index) => (
                    <View key={index} className='flex-row bg-white py-4 border-b border-gray-500'>
                        <View className={`${columnWidths[0]} max-h-14`}>
                            <Text className='text-center'>{item.NumberSuffix}</Text>
                        </View>
                        <View className={`${columnWidths[1]} max-h-14`}>
                            <Text className='text-center'>{new Date(item.DocumentDate).toLocaleDateString()}</Text>
                        </View>
                        <View className={`${columnWidths[2]} max-h-14`}>
                            <Text className='text-center text-xs'>{storehouseNames[item.StorehouseId]}</Text>
                        </View>
                        <View className={`${columnWidths[3]} flex items-center justify-center`}>
                            <TouchableOpacity onPress={() => handleIconPress(item.NumberSuffix)}>
                                <Icon name="infocirlceo" size={15} color="blue" style={{ textAlign: 'center' }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

export default Table;
