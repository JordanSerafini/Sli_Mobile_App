import React, { useEffect, useState } from "react";
import { Button, Text, TextInput, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Chantier } from "../../@types/chantier.type";
import { getChantiers } from "../../utils/functions/chantier_functions";

const CreerChantier: React.FC = () => {
  const [chantier, setChantier] = useState<Chantier>({
    name: "",
    description: "",
    address: "",
    city: "",
    postal_code: "",
    country: "",
    phone: "",
    email: "",
    contact: "",
    start_date: new Date(),
    end_date: new Date(),
    client_id: 0,
    fiche_chantier_id: 0,
  });

  //* -------------------------------------------------------- Input Manager -------------------------------------------------------- *//
  const handleChange = (field: keyof Chantier, value: any) => {
    setChantier({ ...chantier, [field]: value });
  };

//* -------------------------------------------------------- Name Generation -------------------------------------------------------- *//
  const generateChantierName = async () => {
    try {
      const chantiers = await getChantiers();
      const chantierCount = chantiers.length + 1;
      const today = new Date();
      const formattedDate = `${today.getDate().toString().padStart(2, '0')}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getFullYear()}`;
      const newName = `chantier ${chantierCount}-${formattedDate}`;
      setChantier((prev) => ({ ...prev, name: newName }));
    } catch (error) {
      console.error("Error generating chantier name:", error);
    }
  };

  useEffect(() => {
    generateChantierName();
  }, []);

  //* -------------------------------------------------------- Handle Submit -------------------------------------------------------- *//

  const handleSubmit = () => {
    console.log("Chantier submitted", chantier);
  };


  return (
    <SafeAreaView className="w-full h-full items-center justify-start">
        <TextInput
          value={chantier.name}
          onChangeText={(text) => handleChange("name", text)}
          placeholder="Name"
          className="p-2 bg-white rounded- w-full shadow-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        <TextInput
          value={chantier.description}
          onChangeText={(text) => handleChange("description", text)}
          placeholder="Description"
          className="p-2 bg-white rounded- w-full shadow-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        <TextInput
          value={chantier.address}
          onChangeText={(text) => handleChange("address", text)}
          placeholder="Address"
          className="p-2 bg-white rounded- w-full shadow-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        <TextInput
          value={chantier.city}
          onChangeText={(text) => handleChange("city", text)}
          placeholder="City"
          className="p-2 bg-white rounded- w-full shadow-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        <TextInput
          value={chantier.postal_code}
          onChangeText={(text) => handleChange("postal_code", text)}
          placeholder="Postal Code"
          className="p-2 bg-white rounded- w-full shadow-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        <TextInput
          value={chantier.country}
          onChangeText={(text) => handleChange("country", text)}
          placeholder="Country"
          className="p-2 bg-white rounded- w-full shadow-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        <TextInput
          value={chantier.phone}
          onChangeText={(text) => handleChange("phone", text)}
          placeholder="Phone"
          className="p-2 bg-white rounded- w-full shadow-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        <TextInput
          value={chantier.email}
          onChangeText={(text) => handleChange("email", text)}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          className="p-2 bg-white rounded- w-full shadow-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        <TextInput
          value={chantier.contact}
          onChangeText={(text) => handleChange("contact", text)}
          placeholder="Contact"
          className="p-2 bg-white rounded- w-full shadow-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        <TextInput
          value={chantier.client_id?.toString() ?? ""}
          onChangeText={(text) => handleChange("client_id", parseInt(text))}
          placeholder="Client ID"
          keyboardType="number-pad"
          className="p-2 bg-white rounded- w-full shadow-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        <TextInput
          value={chantier.fiche_chantier_id?.toString() ?? ""}
          onChangeText={(text) => handleChange("fiche_chantier_id", parseInt(text))}
          placeholder="Fiche Chantier ID"
          keyboardType="number-pad"
          className="p-2 bg-white rounded- w-full shadow-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        <Button title="Submit" onPress={handleSubmit} />
    </SafeAreaView>
  );
};

export default CreerChantier;
