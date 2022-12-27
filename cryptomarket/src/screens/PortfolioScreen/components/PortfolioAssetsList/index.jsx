import React from "react";
import { View, Text, FlatList } from "react-native";
import { AntDesign } from '@expo/vector-icons';
const PortfolioAssetsList = () =>{
    return(
        <View>
            <FlatList 
            data={[]}
            renderItem={()=> <Text>Item</Text>}
            ListHeaderComponent={
                <>
                    <Text>Current Balance</Text>
                    <Text>20000 TRY</Text>
                    <Text>1000 (All Time)</Text>
                    <View>
                        <AntDesign 
                            name={'caretup'} 
                            size={12} 
                            color = {'white'}
                            style = {{alignSelf : 'center',marginRight :10}} 
                         />
                        <Text>1.2%</Text>
                    </View>
                </>
            }
            />
        </View>
    )
}

export default PortfolioAssetsList;