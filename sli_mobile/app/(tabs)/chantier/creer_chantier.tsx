import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CreerChantier: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Créer Chantier</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreerChantier;
