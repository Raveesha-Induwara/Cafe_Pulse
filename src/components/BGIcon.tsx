import { View } from 'react-native';
import React from 'react';
import CustomIcon from './CustomIcon';

interface BGIconProps {
    name: string,
    color: string,
    size: number,
    BGColor: string,
}

const BGIcon: React.FC<BGIconProps> = ({name, color, size, BGColor}) => {
  return (
    <View className="h-[30] w-[30] rounded-lg items-center justify-center" style={{backgroundColor: BGColor}}>
      <CustomIcon
        name={name}
        color={color}
        size={size}
      />
    </View>
  );
};

export default BGIcon;
