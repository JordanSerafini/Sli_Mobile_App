import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

const sli = require("./assets/sli.jpg");
const bg = require("./assets/loginBg.png");

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("jordan@solution-logique.fr");
  const [password, setPassword] = useState("pass123");

  const router = useRouter();

  const handleLogin = () => {
    router.push("/home");
  };

  return (
    <ImageBackground
      source={bg}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View className="h-5/10 w-full flex items-center justify-center">
        <View className="w-9/10 h-10/10 flex items-center justify-center">
          <Image source={sli} className=" rounded-full h-5/10 w-9/10" />
        </View>
        <View className="h-5/10 w-9.5/10 items-center justify-center flex gap-6">
          <View className="items-center justify-center flex w-full gap-2">
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              className="p-2 bg-white rounded- w-full shadow-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry
              className="p-2 bg-white rounded- w-full shadow-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </View>
          <TouchableOpacity
            onPress={handleLogin}
            className=" bg-blue-500 text-white py-3 px-6 shadow-md w-full rounded-full"
          >
            <Text className="text-white text-center">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
