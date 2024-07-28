import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import EventCards from "./EventCards";

const pp = require("../../assets/pp.jpeg");

interface Event {
  title: string;
  description: string;
  start: string;
  end: string;
  startHour: string;
  endHour: string;
}

const events: { [key: string]: Event[] } = {
  "29/07/2024": [
    {
      title: "Event 1",
      description: "Description 1",
      start: "29/07/2024",
      end: "29/07/2024",
      startHour: "10:00",
      endHour: "12:00",
    },
    {
      title: "Event 2",
      description: "Description 2",
      start: "29/07/2024",
      end: "29/07/2024",
      startHour: "14:00",
      endHour: "16:00",
    },
    {
      title: "Event 3",
      description: "Description 3",
      start: "29/07/2024",
      end: "29/07/2024",
      startHour: "16:00",
      endHour: "18:00",
    },
    {
      title: "Event 4",
      description: "Description 4",
      start: "29/07/2024",
      end: "29/07/2024",
      startHour: "18:00",
      endHour: "20:00",
    },
    {
      title: "Event 5",
      description: "Description 5",
      start: "29/07/2024",
      end: "29/07/2024",
      startHour: "20:00",
      endHour: "22:00",
    },
  ],
  "30/07/2024": [
    {
      title: "Event 1",
      description: "Description 1",
      start: "30/07/2024",
      end: "30/07/2024",
      startHour: "10:00",
      endHour: "12:00",
    },
    {
      title: "Event 2",
      description: "Description 2",
      start: "30/07/2024",
      end: "30/07/2024",
      startHour: "12:00",
      endHour: "14:00",
    },
    {
      title: "Event 3",
      description: "Description 3",
      start: "30/07/2024",
      end: "30/07/2024",
      startHour: "14:00",
      endHour: "16:00",
    },
    {
      title: "Event 4",
      description: "Description 4",
      start: "30/07/2024",
      end: "30/07/2024",
      startHour: "16:00",
      endHour: "18:00",
    },
    {
      title: "Event 5",
      description: "Description 5",
      start: "30/07/2024",
      end: "30/07/2024",
      startHour: "18:00",
      endHour: "20:00",
    },
  ],
  "31/07/2024": [
    {
      title: "Event 1",
      description: "Description 1",
      start: "31/07/2024",
      end: "31/07/2024",
      startHour: "10:00",
      endHour: "12:00",
    },
    {
      title: "Event 2",
      description: "Description 2",
      start: "31/07/2024",
      end: "31/07/2024",
      startHour: "12:00",
      endHour: "14:00",
    },
    {
      title: "Event 3",
      description: "Description 3",
      start: "31/07/2024",
      end: "31/07/2024",
      startHour: "14:00",
      endHour: "16:00",
    },
    {
      title: "Event 4",
      description: "Description 4",
      start: "31/07/2024",
      end: "31/07/2024",
      startHour: "16:00",
      endHour: "18:00",
    },
    {
      title: "Event 5",
      description: "Description 5",
      start: "31/07/2024",
      end: "31/07/2024",
      startHour: "18:00",
      endHour: "20:00",
    },
  ],
  "01/08/2024": [
    {
      title: "Event 1",
      description: "Description 1",
      start: "01/08/2024",
      end: "01/08/2024",
      startHour: "10:00",
      endHour: "12:00",
    },
    {
      title: "Event 2",
      description: "Description 2",
      start: "01/08/2024",
      end: "01/08/2024",
      startHour: "12:00",
      endHour: "14:00",
    },
    {
      title: "Event 3",
      description: "Description 3",
      start: "01/08/2024",
      end: "01/08/2024",
      startHour: "14:00",
      endHour: "16:00",
    },
    {
      title: "Event 4",
      description: "Description 4",
      start: "01/08/2024",
      end: "01/08/2024",
      startHour: "16:00",
      endHour: "18:00",
    },
    {
      title: "Event 5",
      description: "Description 5",
      start: "01/08/2024",
      end: "01/08/2024",
      startHour: "18:00",
      endHour: "20:00",
    },
  ],
  "02/08/2024": [
    {
      title: "Event 1",
      description: "Description 1",
      start: "02/08/2024",
      end: "02/08/2024",
      startHour: "10:00",
      endHour: "12:00",
    },
    {
      title: "Event 2",
      description: "Description 2",
      start: "02/08/2024",
      end: "02/08/2024",
      startHour: "12:00",
      endHour: "14:00",
    },
    {
      title: "Event 3",
      description: "Description 3",
      start: "02/08/2024",
      end: "02/08/2024",
      startHour: "14:00",
      endHour: "16:00",
    },
    {
      title: "Event 4",
      description: "Description 4",
      start: "02/08/2024",
      end: "02/08/2024",
      startHour: "16:00",
      endHour: "18:00",
    },
    {
      title: "Event 5",
      description: "Description 5",
      start: "02/08/2024",
      end: "02/08/2024",
      startHour: "18:00",
      endHour: "20:00",
    },
  ],
};


function Dashboard() {
  const [dateSelected, setDateSelected] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || dateSelected;
    setShowPicker(false);
    setDateSelected(currentDate);
  };

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formattedDate = formatDate(dateSelected);

  return (
    <View className="pt-8 h-fit w-full rounded-3xl bg-blue-800 items-center">
      {/* ------------------------------------------------------------ Header --------------------------------------------------------------------------- */}
      <View className="items-center w-9/10 flex-row justify-between">
        <Icon name="navicon" size={30} color="white" />
        <Text className="text-white font-bold text-base">Tableau de bord</Text>
        <Image source={pp} className="rounded-full w-12 h-12" />
      </View>
      {/* ------------------------------------------------------------ Input date du jour --------------------------------------------------------------------------- */}
      <View className="w-9/10 items-center pt-3">
        <TouchableOpacity
          onPress={() => setShowPicker(true)}
          className="mt-2 w-full "
        >
          <View className="bg-white rounded-full p-2 text-blue-800 w-full text-center flex-row items-center justify-between">
            <Text className=" ">
              {dateSelected.toDateString()}
            </Text>
            <Icon name="calendar" size={25} color="blue" />
          </View>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={dateSelected}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
      </View>
      {/* ------------------------------------------------------------ Card events --------------------------------------------------------------------------- */}
      {events[formattedDate] ? (
        <EventCards events={events[formattedDate]} />
      ) : (
        <Text className="text-white p-4">Aucun événement pour cette date.</Text>
      )}
    </View>
  );
}

export default Dashboard;
