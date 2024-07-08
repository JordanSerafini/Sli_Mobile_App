import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import NavRouter from "./app/navigation/NavRouter";


export default function App() {
  return (
    <NavigationContainer>
      <NavRouter />
    </NavigationContainer>
  );
}
