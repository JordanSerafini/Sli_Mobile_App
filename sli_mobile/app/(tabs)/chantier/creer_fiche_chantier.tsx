import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';

import { getItemPaginated } from '../../utils/functions/item_function';
import { getStaff } from '../../utils/functions/chantier_functions';

import { FicheChantier, Staff } from '../../@types/chantier.type';
import { Item } from '../../@types/item.type';

const closeIcon = require('../../assets/Icons/close.png');

const CreerFicheChantier: React.FC<{ setShowAddModal: (value: boolean) => void, onSave: (fiche: FicheChantier) => void, chantierId: number }> = ({ onSave, chantierId, setShowAddModal }) => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [staffSelected, setStaffSelected] = useState<Staff[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [itemsSelected, setItemsSelected] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const staffResponse = await getStaff();
        setStaff(staffResponse);
      } catch (error) {
        console.error('Error fetching staff:', error);
      }

      try {
        const itemResponse = await getItemPaginated(50, 0, '');
        setItems(itemResponse.items);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchData();
  }, []);


  const handleSubmit = () => {
    const newFicheChantier: FicheChantier = {
      id: 0,
      name: '',
      project_manager_id: undefined,
      chantier_id: chantierId
    };
    onSave(newFicheChantier);
  };

  return (
    <View className='w-9/10 h-8/10 z-50 bg-white border rounded-3xl items-center justify-between'>
      <TouchableOpacity onPress={() => setShowAddModal(false)} style={{ position: 'absolute', top: 10, right: 10 }}>
        <Image source={closeIcon} className='w-6 h-6' />
      </TouchableOpacity>
      <View className='h-5/10'>
        <Text></Text>
      </View>
      <View className='h-5/10'>

      </View>
      
      <Button title="Save Fiche Chantier" onPress={handleSubmit} />
    </View>
  );
};

export default CreerFicheChantier;
