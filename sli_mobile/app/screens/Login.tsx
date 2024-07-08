import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { url } from "../utils/url";

const loginBG = require("../assets/loginBG.jpg");
const sliLogo = require("../assets/sli.png");

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(`${url.auth}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem("token", data.token);
        navigation.replace("Authenticated");
      } else {
        setError("Email ou mot de passe incorrect");
      }
    } catch (error) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
      console.error(error);
    }
  };

  return (
    <ImageBackground source={loginBG} className="flex-1 justify-center">
      <View className="w-full h-full flex items-center justify-center">
        <View className="w-full h-5/10 flex items-center justify-center">
          <Image source={sliLogo} className="rounded-full w-7/10 h-3.5/10" />
        </View>

        <View className="w-9.5/10 h-2.5/10">
          <View className="gap-2">
            {error ? (
              <Text className="text-red-500 text-center mb-4">{error}</Text>
            ) : null}
            <TextInput
              className="bg-white p-2"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              className="bg-white p-2 mb-4"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <TouchableOpacity
            className="bg-blue-500 p-4 rounded-full"
            onPress={handleLogin}
          >
            <Text className="text-white font-bold text-center">CONNEXION</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Login;
