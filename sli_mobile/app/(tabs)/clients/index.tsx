import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { DefaultTheme, Provider as PaperProvider, Portal } from "react-native-paper";
import ButtonPerso from "../../components/UI/ButtonPerso";
import FabPerso from "../../components/UI/Fab/client/FabGroupClient";
import { View } from "react-native";
import ClientScreen from "./clientList";
import MapClientScreen from "./clientMapAll";
import AddClientModal from "./modals/AddClientModal"; 
import EditClientModal from "./modals/EditClientModal";

const IndexScreen: React.FC = () => {
  const [content, setContent] = useState("Liste" || "Carte");

  // États pour chaque modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showEditClientModal, setShowEditClientModal] = useState(false);
  const [showAddClientModal, setShowAddClientModal] = useState(false);

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#3B82F6",
      secondary: "#BFDBFE",
      accent: "#1E3A8A",
    },
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView className="flex items-center justify-start w-full h-full">
        {/*---------------------------------------- Button Nav -----------------------------*/}
        <View className="w-full flex-row items-center justify-evenly pb-2">
          <ButtonPerso
            mode={content === "Liste" ? "contained" : "outlined"}
            icon={"account"}
            text={"Liste"}
            css="w-4.5/10 self-center"
            onPress={() => setContent("Liste")}
          />
          <ButtonPerso
            mode={content === "Carte" ? "contained" : "outlined"}
            icon={"map-marker-account"}
            text={"Carte"}
            css="w-4.5/10 self-center"
            onPress={() => setContent("Carte")}
          />
        </View>
        {/*---------------------------------------- Content -----------------------------*/}
        <View>
          {content === "Liste" && <ClientScreen />}
          {content === "Carte" && <MapClientScreen />}
        </View>
        {showAddClientModal || showEditClientModal ? (null) : (
        <FabPerso
          showAddModal={() => {
            setShowAddModal(true);
          }}
          showEmailModal={() => setShowEmailModal(true)}
          showEditClientModal={() => setShowEditClientModal(true)}
          showAddClientModal={() => setShowAddClientModal(true)}
        />
        )}
        {/*---------------------------------------- Modals -----------------------------*/}
        <Portal>
          <AddClientModal visible={showAddClientModal} onDismiss={() => setShowAddClientModal(false)} />
          <EditClientModal visible={showEditClientModal} onDismiss={() => setShowEditClientModal(false)} />
        </Portal>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default IndexScreen;
