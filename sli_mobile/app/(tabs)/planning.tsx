import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const PlanningScreen: React.FC = () => {


  return (
    <View style={styles.container}>
      <Text>PlanningScreen </Text>
      
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

export default PlanningScreen;
