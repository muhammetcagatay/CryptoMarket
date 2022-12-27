import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import HomeScreen  from './src/screens/HomeScreen';
import CoinDetaiedScreen from './src/screens/CoinDetailedScreen';


export default function App() {
  return (
    <View style={styles.container}>
      <CoinDetaiedScreen />
      <StatusBar style="light" />
    </View>
  );