import React from 'react';
import { View, Text, FlatList } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

interface Event {
  title: string;
  description: string;
  start: string;
  end: string;
  startHour: string;
  endHour: string;
}

interface EventCardsProps {
  events: Event[];
}

const EventCards: React.FC<EventCardsProps> = ({ events }) => {
  return (
    <View className="w-9.5/10 mt-4 p-4">
      <FlatList
        data={events}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="p-4 w-36 bg-white rounded-lg shadow mr-4">
            <View className='flex-row justify-between'> 
            <Text className="text-lg font-bold">{item.title}</Text>
            < Icon name="clock-o" size={24} color="green" />
            </View>
            <Text>{item.description}</Text>
            <Text>
              {item.startHour} - {item.endHour}
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
}

export default EventCards;
