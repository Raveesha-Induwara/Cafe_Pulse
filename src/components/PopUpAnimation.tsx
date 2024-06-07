import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';

interface PopUpAnimationProps {
  style: any;
  source: any;
}

export const PopUpAnimation: React.FC<PopUpAnimationProps> = ({
  style,
  source,
}) => {
  return (
    <View className="flex-1 absolute top-0 bottom-0 left-0 right-0 z-50 bg-secondaryBlackRGBA justify-center">
      <LottieView style={style} source={source} autoPlay loop={false} />
    </View>
  );
};
