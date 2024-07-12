import { router } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import ButtonPerso from "../../components/UI/ButtonPerso";
import FabPerso from "../../components/UI/Fab/client/FabGroupClient";
import { View } from "react-native";
import ClientScreen from "./clientList";
import MapClientScreen from "./clientMapAll";

const IndexScreen: React.FC = () => {

  const [content, setContent] = React.useState("Liste" || "Carte");



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
      <SafeAreaView className="flex items-center justify-start w-full h-full ">
        <View className="w-full flex-row items-center justify-evenly ">
          <ButtonPerso
            mode={ content== "Liste" ? "contained" : "outlined"}
            icon={"account"}
            text={"Liste"}
            css="w-4.5/10 self-center"
            onPress={() => setContent("Liste")}
          />
          <ButtonPerso
            mode={ content== "Carte" ? "contained" : "outlined"}
            icon={"map-marker-account"}
            text={"Carte"}
            css="w-4.5/10 self-center"
            onPress={() => setContent("Carte")}
          />
        </View>
      <View>
        {content === "Liste" && (
          < ClientScreen />
        )}
        {content === "Carte" && (
          < MapClientScreen />
        )}
          
      </View>
        <FabPerso />
      </SafeAreaView>
    </PaperProvider>
  );
};

export default IndexScreen;
