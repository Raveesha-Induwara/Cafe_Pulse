import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../theme/theme';
import classNames from 'classnames';
import CustomIcon from './CustomIcon';
import {ImageSourcePropType} from 'react-native';

interface CartItemProps {
  id: string;
  name: string;
  imageLink_square: string;
  special_ingredient: string;
  roasted: string;
  type: string;
  prices: any;
  incrementCartItemQuantity: any;
  decrementCartItemQuantity: any;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  imageLink_square,
  special_ingredient,
  roasted,
  type,
  prices,
  incrementCartItemQuantity,
  decrementCartItemQuantity,
}) => {
  return (
    <View>
      {prices.length !== 1 ? (
        <LinearGradient
          className="flex-1 p-3 rounded-3xl"
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
          {/* Top container */}
          <View className="flex-1 flex-row gap-3">
            <Image
              source={imageLink_square as ImageSourcePropType}
              className="h-[130] w-[130] rounded-2xl"
            />
            <View className="flex-1 py-1 justify-between">
              {/* Name & ingredient container */}
              <View>
                <Text className="font-poppins_medium text-lg text-primaryWhiteHex">
                  {name}
                </Text>
                <Text className="font-poppins_regular text-xs text-secondaryLightGreyHex">
                  {special_ingredient}
                </Text>
              </View>
              {/* Roasted container */}
              <View className="h-[50] w-[120] rounded-xl bg-primaryDarkGreyHex justify-center items-center">
                <Text className="font-poppins_regular text-xs text-primaryWhiteHex">
                  {roasted}
                </Text>
              </View>
            </View>
          </View>

          {/* Price List */}
          {prices.map((data: any, index: any) => (
            <View
              key={index.toString()}
              className="flex-1 flex-row mt-2 items-center justify-center gap-x-5">
              {/* Price and Size */}
              <View className="flex-1 flex-row items-center justify-between">
                <View className="h-[40] w-[80] bg-primaryBlackHex rounded-lg justify-center items-center">
                  <Text
                    className={classNames(
                      'font-poppins_medium text-base text-secondaryLightGreyHex',
                      {
                        'text-sm': type === 'Bean',
                      },
                    )}>
                    {data.size}
                  </Text>
                </View>
                <Text className="font-poppins_semibold text-lg text-primaryOrangeHex">
                  {data.currency}{' '}
                  <Text className="text-primaryWhiteHex">{data.price}</Text>
                </Text>
              </View>

              {/* Quantity Controller */}
              <View className="flex-1 flex-row items-center justify-between">
                {/* Remove quantity button */}
                <TouchableOpacity
                  className="p-3 rounded-lg bg-primaryOrangeHex"
                  onPress={() => {
                    decrementCartItemQuantity(id, data.size);
                  }}>
                  <CustomIcon
                    name="minus"
                    size={10}
                    color={COLORS.primaryWhiteHex}
                  />
                </TouchableOpacity>
                {/* Quantity */}
                <View className="w-[80] py-1 bg-secondaryBlackRGBA border-2 rounded-lg border-primaryOrangeHex items-center">
                  <Text className="font-poppins_semibold text-base text-primaryWhiteHex">
                    {data.quantity}
                  </Text>
                </View>
                {/* Add quantity button */}
                <TouchableOpacity
                  className="p-3 rounded-lg bg-primaryOrangeHex"
                  onPress={() => {
                    incrementCartItemQuantity(id, data.size);
                  }}>
                  <CustomIcon
                    name="add"
                    size={10}
                    color={COLORS.primaryWhiteHex}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </LinearGradient>
      ) : (
        <LinearGradient
          className="flex-row rounded-3xl items-center"
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
          <View className="flex-1 p-3 flex-row space-x-3">
            <Image
              source={imageLink_square as ImageSourcePropType}
              className="h-[140] w-[140] rounded-2xl"
            />
            <View className="flex-1 py-1 justify-around items-stretch">
              {/* Name & ingredient container */}
              <View>
                <Text className="font-poppins_medium text-lg text-primaryWhiteHex">
                  {name}
                </Text>
                <Text className="font-poppins_regular text-xs text-secondaryLightGreyHex">
                  {special_ingredient}
                </Text>
              </View>
              {/* Size & Price container */}
              <View className="my-1 flex-row items-center justify-evenly">
                <View className="h-[40] w-[100] rounded-lg bg-primaryBlackHex justify-center items-center">
                  <Text
                    className={classNames(
                      'font-poppins_medium text-lg text-secondaryLightGreyHex',
                      {'text-base': type === 'Bean'},
                    )}>
                    {prices[0].size}
                  </Text>
                </View>
                <Text className="font-poppins_semibold text-lg text-primaryOrangeHex">
                  {prices[0].currency}{' '}
                  <Text className="text-primaryWhiteHex">
                    {prices[0].price}
                  </Text>
                </Text>
              </View>

              {/* Quantity Controller */}
              <View className="flex-1 flex-row items-center justify-evenly">
                {/* Remove quantity button */}
                <TouchableOpacity
                  className="p-3 rounded-lg bg-primaryOrangeHex"
                  onPress={() => {
                    decrementCartItemQuantity(id, prices[0].size);
                  }}>
                  <CustomIcon
                    name="minus"
                    size={10}
                    color={COLORS.primaryWhiteHex}
                  />
                </TouchableOpacity>
                {/* Quantity */}
                <View className="w-[80] py-1 bg-secondaryBlackRGBA border-2 rounded-lg border-primaryOrangeHex items-center">
                  <Text className="font-poppins_semibold text-base text-primaryWhiteHex">
                    {prices[0].quantity}
                  </Text>
                </View>
                {/* Add quantity button */}
                <TouchableOpacity
                  className="p-3 rounded-lg bg-primaryOrangeHex"
                  onPress={() => {
                    incrementCartItemQuantity(id, prices[0].size);
                  }}>
                  <CustomIcon
                    name="add"
                    size={10}
                    color={COLORS.primaryWhiteHex}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      )}
    </View>
  );
};

export default CartItem;
