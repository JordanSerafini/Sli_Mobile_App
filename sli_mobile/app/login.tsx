import React, { useState } from "react";
import { View, Text, Button, TextInput, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const sli = require("./assets/sli.jpg");

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("jordan@solution-logique.fr");
  const [password, setPassword] = useState("pass123");

  const router = useRouter();

  const handleLogin = () => {
    router.push("/home");
  };

  return (
    <View className="h-full w-full flex items-center justify-center">
      <View>
        <Image source={sli} className="w-9/10" />
      </View>
      <View>
        <View>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
          />
        </View>
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
};

export default LoginScreen;
