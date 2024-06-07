import React from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS} from '../theme/theme';
import {HeaderBar} from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import {PaymentFooter} from '../components/PaymentFooter';
import CartItem from '../components/CartItem';

// Screen width and height
const screenWidth = Dimensions.get('window').width;
// const screenHeight = Dimensions.get('window').height;

// Responsive width and height
const RPW = (percentage: number) => {
  return (percentage / 100) * screenWidth;
};
// const RPH = (percentage: number) => {
//   return (percentage / 100) * screenHeight;
// };

export const CartScreen = ({navigation}: any) => {
  const CartList = useStore((state: any) => state.CartList);
  const CartPrice = useStore((state: any) => state.CartPrice);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const incrementCartItemQuantity = useStore(
    (state: any) => state.incrementCartItemQuantity,
  );
  const decrementCartItemQuantity = useStore(
    (state: any) => state.decrementCartItemQuantity,
  );
  const tabBarHeight = useBottomTabBarHeight();

  const incrementCartItemQuantityHandler = (id: string, size: string) => {
    incrementCartItemQuantity(id, size);
    calculateCartPrice();
  };

  const decrementCartItemQuantityHandler = (id: string, size: string) => {
    decrementCartItemQuantity(id, size);
    calculateCartPrice();
  };
  // console.log('CartList: ', CartList);

  const buttonPressHandler = () => {
    navigation.push('Payment', {amount: CartPrice});
  };

  return (
    <View className="flex-1 bg-primaryBlackHex">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: RPW(6)}}>
        <View style={{marginBottom: tabBarHeight}}>
          <View className="flex-1">
            {/* Call the custom Header component */}
            <HeaderBar title="Cart" />

            {CartList.length === 0 ? (
              <EmptyListAnimation title={'Cart is Empty'} />
            ) : (
              <View className="gap-5">
                {CartList.map((data: any) => (
                  // Call the custom CartItem component
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}>
                    <CartItem
                      id={data.id}
                      name={data.name}
                      imageLink_square={data.imageLink_square}
                      special_ingredient={data.special_ingredient}
                      roasted={data.roasted}
                      type={data.type}
                      prices={data.prices}
                      incrementCartItemQuantity={
                        incrementCartItemQuantityHandler
                      }
                      decrementCartItemQuantity={
                        decrementCartItemQuantityHandler
                      }
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* PaymentFooter Component */}
          {CartList.length !== 0 ? (
            <View className="">
              <PaymentFooter
                buttonTitle="Pay"
                price={{price: CartPrice, currency: '$'}}
                buttonPressHandler={buttonPressHandler}
              />
            </View>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
