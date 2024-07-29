import React from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

interface Event {
  title: string;
  description: string;
  start: string;
  end: string;
  startHour: string;
  endHour: string;
  urgence?: string;
}

interface EventCardsProps {
  events: Event[];
}

const getIconColor = (urgence?: string): string => {
  switch (urgence) {
    case "Haute":
      return "red";
    case "Moyen":
      return "orange";
    case "Faible":
      return "green";
    default:
      return "black";
  }
};

const EventCards: React.FC<EventCardsProps> = ({ events }) => {
  return (
    <View className="w-9.5/10 mt-4 p-4">
      <FlatList
        data={events}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="p-4 w-48 bg-white rounded-lg shadow mr-4 justify-between">
            <View className='flex-row justify-between items-start mb-2'>
              <ScrollView horizontal={false} className='max-h-16'>
                <Text className="text-sm font-bold">{item.title}</Text>
              </ScrollView>
              <Icon name="clock-o" size={20} color={getIconColor(item.urgence)} />
            </View>
            <Text className='self-end'>
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
