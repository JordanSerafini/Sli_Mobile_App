import React from "react";
import { View, Text, ScrollView } from "react-native";
import NotificationComponent from "./Notification";
import NoteComponent from "./Note";

const MainHome: React.FC = () => {
  const notifications = [
    {
      title: "Inspection du bâtiment",
      description:
        "Inspection générale du bâtiment pour vérifier l'état des structures.",
      type: "inspection",
      start: "2024-08-01",
      end: "2024-08-01",
      startHour: "09:00",
      endHour: "11:00",
    },
    {
      title: "Réunion de chantier",
      description:
        "Réunion hebdomadaire avec les chefs de chantier pour discuter des progrès et des problèmes.",
      type: "meeting",
      start: "2024-08-02",
      end: "2024-08-02",
      startHour: "10:00",
      endHour: "11:00",
    },
    {
      title: "Maintenance HVAC",
      description:
        "Maintenance programmée des systèmes de chauffage, ventilation et climatisation.",
      type: "maintenance",
      start: "2024-08-03",
      end: "2024-08-03",
      startHour: "08:00",
      endHour: "12:00",
    },
    {
      title: "Livraison de matériaux",
      description:
        "Réception et vérification des matériaux de construction livrés sur site.",
      type: "delivery",
      start: "2024-08-04",
      end: "2024-08-04",
      startHour: "14:00",
      endHour: "15:00",
    },
    {
      title: "Formation sécurité",
      description:
        "Formation sur les protocoles de sécurité pour tous les employés du site.",
      type: "training",
      start: "2024-08-05",
      end: "2024-08-05",
      startHour: "13:00",
      endHour: "17:00",
    },
  ];

  return (
    <View className="pt-6 w-9.5/10 items-center justify-center">
      
      <View className="h-40">
        <Text className="">Evènements ajourd'hui</Text>
        <NotificationComponent notifications={notifications} />
      </View>
      <View className="h-40">
        <Text className="">Evènements cette semaine</Text>
        <NotificationComponent notifications={notifications} />
      </View>

    </View>
  );
};

export default MainHome;
