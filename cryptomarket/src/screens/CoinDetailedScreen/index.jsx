import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, TextInput, ActivityIndicator } from "react-native" ;
//import Coin from '../../../assets/data/crypto.json'
import CoinDetailedHeader from "./components/CoinDetailedHeader";
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { useRoute } from "@react-navigation/native";
import { getDetailedCoinData, getCoinMarketChart } from '../../services/requests'


const CoinDetailedScreen = () => {

    const [coin,setCoin] = useState(null);
    const [coinMarketData,setCoinMarketData] = useState(null);

    const route = useRoute();
    const {params: { coinId }} = route;

    const [loading, setLoading] = useState(false);
    const [coinValue, setCoinValue] = useState("1")
    const [tryValue, setTryValue] = useState("") 

    const fetchCoinData = async () =>{
      setLoading(true);
      const fetchedCoinData = await getDetailedCoinData(coinId);
      const fetchedCoinMarketData = await getCoinMarketChart(coinId);
      setCoin(fetchedCoinData);
      setCoinMarketData(fetchedCoinMarketData);
      setTryValue(fetchedCoinData.market_data.current_price.try.toString())
      setLoading(false);
    }

    useEffect(() => {
      fetchCoinData()
    }, [])

    if(loading || !coin || !coinMarketData){
      return <ActivityIndicator size="large" />
    }

    const {
    id,
    image: { small }, 
    name,
    symbol,
    market_data:
    {
      market_cap_rank,
      current_price,
      price_change_percentage_24h
    },
    } = coin;
    
        const { prices } = coinMarketData;
    const percentageColor =price_change_percentage_24h < 0 ? '#ea3943': '#16c784' || 'white';
    const screenWidth = Dimensions.get('window').width;

     const changeCoinValue = (value) => {
        setCoinValue(value)
        const floatValue = parseFloat(value.replace(',','.')) || 0
        setTryValue((floatValue* current_price.try).toString())
     };

     const changetryValue = (value) => {
        setTryValue(value)
        const floatValue = parseFloat(value.replace(',','.')) || 0
        setCoinValue((floatValue / current_price.try).toString())
     };

   /* useEffect(() => {

     }, [coinValue])
     
       useEffect(() => {

     }, [tryValue])

     */

    return(
    <View style={{paddingHorizontal:10}}>
      <CoinDetailedHeader
       coinId={id}
       image ={small} 
       name = {name} 
       symbol ={symbol} 
       marketCapRank = {market_cap_rank}
       />
       <View style = {styles.priceContainer}>
        <View>
          <Text style ={styles.name}>{name}</Text>
          <Text style ={styles.currentPrice}>{current_price.try} TRY</Text>
        </View>
        <View style = {{backgroundColor:percentageColor, paddingHorizontal :3,paddingVertical:8,borderRadius:5,flexDirection:'row'}}>
          <AntDesign 
          name={price_change_percentage_24h < 0 ? 'caretdown' : 'caretup' } 
          size={12} 
          color = {'white'}
          style = {{alignSelf : 'center',marginRight :10}} 
           />
          <Text style = {styles.priceChange}>
          %{price_change_percentage_24h?.toFixed(2)}
        </Text>
        </View>
       </View>
       <View style = {{flexDirection: 'row'}}>
        <View style = {{flexDirection:'row',flex:1}}>
          <Text style={{color:'white',alignSelf:'center'}}>{symbol.toUpperCase()}</Text>
          <TextInput 
          style={styles.input} 
          value={coinValue}
          keyboardType="numeric"
          onChangeText={changeCoinValue}
           />
        </View>
        <View style = {{flexDirection:'row',flex:1}}>
          <Text style={{color:'white',alignSelf:'center'}}>TRY</Text>
          <TextInput
          style={styles.input} 
          value={tryValue}
          keyboardType="numeric"
          onChangeText={changetryValue}
          />
        </View>
       </View>
    </View>
    );
};

export default CoinDetailedScreen;