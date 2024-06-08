import React from 'react';
import {Text, View} from 'react-native';
import {COLORS, FONTSIZE} from '../theme/theme';
import GradientBGIcon from './GradientBGIcon';
import ProfilePic from './ProfilePic';

interface HeaderBarProps {
  title?: string;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({title}) => {
  return (
    <View className="flex-row p-8 justify-between items-center">
      <GradientBGIcon
        name="menu"
        color={COLORS.primaryLightGreyHex}
        size={FONTSIZE.size_16}
      />
      <Text className="text-xl font-poppins_semibold text-primaryWhiteHex">
        {title}
      </Text>
      <ProfilePic />
    </View>
  );
};
