import {View, Text, Image, ImageProps} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../theme/theme';
import CustomIcon from './CustomIcon';
import classNames from 'classnames';

interface PaymentMethodProps {
  paymentMode: string;
  name: string;
  icon: any;
  isIcon: boolean;
}

export const PaymentMethod: React.FC<PaymentMethodProps> = ({
  paymentMode,
  name,
  icon,
  isIcon,
}) => {
  return (
    <View
      className={classNames(
        'rounded-3xl bg-primaryGreyHex border-2 border-primaryGreyHex overflow-hidden',
        {'border-primaryOrangeHex': paymentMode === name},
      )}>
      {isIcon ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          className="flex-row px-6 py-3">
          <View className="flex-grow flex-row items-center ">
            <View className="flex-grow flex-row items-center space-x-6">
              <CustomIcon
                name={icon}
                size={30}
                color={COLORS.primaryOrangeHex}
              />
              <Text className="text-base font-poppins_semibold text-primaryWhiteHex">
                {name}
              </Text>
            </View>
            <Text className="text-base font-poppins_regular text-secondaryLightGreyHex">
              $ 100.50
            </Text>
          </View>
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          className="px-6 py-3">
          <View className="flex-row justify-start items-center space-x-6">
            <Image source={icon as ImageProps} className="h-8 w-8" />
            <Text className="text-base font-poppins_semibold text-primaryWhiteHex">
              {name}
            </Text>
          </View>
        </LinearGradient>
      )}
    </View>
  );
};
