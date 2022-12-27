import { atom, selector } from 'recoil'; // atom rerender screens with updated values, selecter is a function that accepts atom or other selectors
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWatchlistedCoins } from '../services/requests';

export const allPortfolioBoughtAssets = selector({
    key:'allPortfolioBoughtAssets',
    get:async () => {
        const jsonValue = await AsyncStorage.getItem('@portfolio_coins')
        return jsonValue != null ? JSON.parse(jsonValue) : []
    }
})