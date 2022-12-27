import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CoinItem from './src/components/CoinItem';

export default function App() {
  return (
    <View style={styles.container}>
      <CoinItem />
	  <StatusBar style="light" />
	</View> 
});
const styles = StyleSheet.create({
	flex: 1,
    backgroundColor: "#121212",
    paddingTop: 50,
	}
});