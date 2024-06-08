import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

export type RootStackParamList = {
    Home: undefined;
    Cart: undefined;
    Favorite: undefined;
    History: undefined;
    Payment: {amount: number};
    Details: {type: string; index: number, id: string};
};

export type NavigationHookType = NativeStackNavigationProp<RootStackParamList>;

export const useNav = () => useNavigation<NavigationHookType>();
