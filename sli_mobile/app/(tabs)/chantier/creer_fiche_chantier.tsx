import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity, FlatList } from 'react-native';

import { getItemPaginated } from '../../utils/functions/item_function';
import { getStaff } from '../../utils/functions/chantier_functions';

import { FicheChantier, Staff } from '../../@types/chantier.type';
import { Item } from '../../@types/item.type';

const closeIcon = require('../../assets/Icons/close.png');
const addPersonIcon = require('../../assets/Icons/addPerson.png');
const outilsIcon = require('../../assets/Icons/outils.png');
const workerIcon = require('../../assets/Icons/worker.png');

const CreerFicheChantier: React.FC<{ setShowAddModal: (value: boolean) => void, onSave: (fiche: FicheChantier) => void, chantierId: number }> = ({ onSave, chantierId, setShowAddModal }) => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [staffSelected, setStaffSelected] = useState<Staff[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [itemsSelected, setItemsSelected] = useState<Item[]>([]);
  const [showStaffList, setShowStaffList] = useState(false);
  const [showItemsList, setShowItemsList] = useState(false);

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

  const handleStaffSelect = (selectedStaff: Staff) => {
    setStaffSelected([...staffSelected, selectedStaff]);
    setStaff(staff.filter(s => s.id !== selectedStaff.id));
  };

  const handleItemSelect = (selectedItem: Item) => {
    setItemsSelected([...itemsSelected, selectedItem]);
    setItems(items.filter(i => i.id !== selectedItem.id));
  };

  const handleSubmit = () => {
    const newFicheChantier: FicheChantier = {
      id: 0,
      name: '',
      project_manager_id: undefined,
      chantier_id: chantierId,
     
    };
    onSave(newFicheChantier);
  };

  return (
    <View className='w-9/10 h-8/10 z-50 bg-white border rounded-3xl items- justify-between'>
      {/*-------------------------------------------- Close Button ------------------------------------------------------*/}
      <TouchableOpacity onPress={() => setShowAddModal(false)} style={{ position: 'absolute', top: 10, right: 10 }}>
        <Image source={closeIcon} className='w-6 h-6' />
      </TouchableOpacity>

      {/*-------------------------------------------- Ajouter staff ------------------------------------------------------*/}
      <View className='h-5/10 w-full p-2 items-center justify-center border-2 border-blue-400'>
        <TouchableOpacity onPress={() => setShowStaffList(!showStaffList)}>
          <Image source={addPersonIcon} className='w-12 h-12' />
        </TouchableOpacity>
        {showStaffList && (
          <FlatList
            className='w-full h-8/10 gap-2 flex-row border-2 border-red-400'
            data={staff}
            horizontal={true}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleStaffSelect(item)} className='flex items-center justify-center p-2 shadow-2xl'>
                <Image source={workerIcon} className='w-6 h-6' />
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}
        <Text>Staff sélectionné :</Text>
        <FlatList
          data={staffSelected}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
            </View>
          )}
        />
      </View>

      {/*-------------------------------------------- Ajouter Item ------------------------------------------------------*/}
      <View className='h-5/10 w-full p-2 items-center justify-center border-2 border-green-400'>
        <TouchableOpacity onPress={() => setShowItemsList(!showItemsList)}>
          <Image source={outilsIcon} className='w-12 h-12' />
        </TouchableOpacity>
        {showItemsList && (
          <FlatList
            className='w-full h-8/10 gap-2 flex-row border-2 border-red-400'
            data={items}
            horizontal={true}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleItemSelect(item)} className='flex items-center justify-center p-2 shadow-2xl'>
                <Text>{item.Caption}</Text>
              </TouchableOpacity>
            )}
          />
        )}
        <Text>Items sélectionnés :</Text>
        <FlatList
          data={itemsSelected}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.Caption}</Text>
            </View>
          )}
        />
      </View>

      <Button title="Save Fiche Chantier" onPress={handleSubmit} />
    </View>
  );
};

export default CreerFicheChantier;