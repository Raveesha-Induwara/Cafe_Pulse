import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

interface PriceProps {
  price: string;
  currency: string;
}

interface PaymentFooterProps {
  price: PriceProps;
  buttonPressHandler: any;
  buttonTitle: string;
}

export const PaymentFooter: React.FC<PaymentFooterProps> = ({
  price,
  buttonPressHandler,
  buttonTitle,
}) => {
  return (
    <View className="flex-row p-5 gap-5 items-center justify-center">
      {/* Price */}
      <View className="w-[100] items-center">
        <Text className="font-poppins_medium text-sm text-secondaryLightGreyHex">
          Price
        </Text>
        <Text className="font-poppins_semibold text-2xl text-primaryOrangeHex">
          {price.currency}{' '}
          <Text className="text-primaryWhiteHex">{price.price}</Text>
        </Text>
      </View>
      {/* Button */}
      <TouchableOpacity
        className="flex-1 items-center justify-center h-[60] rounded-2xl bg-primaryOrangeHex"
        onPress={() => buttonPressHandler()}>
        <Text className="font-poppins_semibold text-lg text-primaryWhiteHex">
          {buttonTitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
