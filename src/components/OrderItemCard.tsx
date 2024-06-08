import classNames from 'classnames';
import React from 'react';
import {Image, ImageProps, ImageSourcePropType, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../theme/theme';

interface OrderItemCardProps {
  type: string;
  name: string;
  imageLink_square: ImageProps;
  special_ingredient: string;
  prices: any;
  itemPrice: string;
}

export const OrderItemCard: React.FC<OrderItemCardProps> = ({
  type,
  name,
  imageLink_square,
  special_ingredient,
  prices,
  itemPrice,
}) => {
  return (
    <LinearGradient
      className="flex-1 p-4 rounded-3xl"
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
      {/* Top container */}
      <View className="flex-1 flex-row mb-2 justify-between items-center">
        {/* Image, Name & Ingredient container */}
        <View className="flex-row items-center gap-4">
          <Image
            source={imageLink_square as ImageSourcePropType}
            className="h-[80] w-[80] rounded-2xl"
          />
          <View>
            <Text className="font-poppins_medium text-lg text-primaryWhiteHex">
              {name}
            </Text>
            <Text className="font-poppins_regular text-xs text-secondaryLightGreyHex">
              {special_ingredient}
            </Text>
          </View>
        </View>

        {/* Item Price */}
        <View>
          <Text className="font-poppins_semibold text-lg text-primaryWhiteHex">
            <Text className="text-primaryOrangeHex">$ </Text>
            {itemPrice}
          </Text>
        </View>
      </View>

      {/* Price List */}
      {prices.map((data: any, index: any) => (
        <View
          key={index.toString()}
          className="flex-1 flex-row mt-2 items-center justify-between">
          {/* Price and Size Card Container */}
          <View className="flex-row">
            {/* Size of the item */}
            <View className="h-[40] w-[80] bg-primaryBlackHex rounded-l-lg border-r border-primaryGreyHex justify-center items-center">
              <Text
                className={classNames(
                  'font-poppins_medium text-lg text-primaryWhiteHex',
                  {
                    'text-sm': type === 'Bean',
                  },
                )}>
                {data.size}
              </Text>
            </View>

            {/* Price of one item */}
            <View className="h-[40] w-[100] bg-primaryBlackHex rounded-r-lg justify-center items-center">
              <Text className="font-poppins_semibold text-lg text-primaryOrangeHex">
                {data.currency}{' '}
                <Text className="text-primaryWhiteHex">{data.price}</Text>
              </Text>
            </View>
          </View>

          {/* Quantity */}
          <View className="items-center">
            <Text className="font-poppins_semibold text-base text-primaryWhiteHex">
              <Text className="text-primaryOrangeHex">X </Text>
              {data.quantity}
            </Text>
          </View>

          {/* Total price */}
          <View className="items-center">
            <Text className="font-poppins_semibold text-base text-primaryOrangeHex">
              $ {(data.quantity * data.price).toFixed(2).toString()}
            </Text>
          </View>
        </View>
      ))}
    </LinearGradient>
  );
};
