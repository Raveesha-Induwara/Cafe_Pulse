import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

interface EmptyListAnimationProps {
  title: string;
}

const EmptyListAnimation: React.FC<EmptyListAnimationProps> = ({title}) => {
  return (
    <View className="flex-1 justify-center">
      <LottieView
        style={styles.LottieStyle}
        source={require('../lottie/coffeecup.json')}
        autoPlay
        loop
      />
      <Text className="font-poppins_medium text-base text-primaryOrangeHex self-center">
        {title}
      </Text>
    </View>
  );
};

export default EmptyListAnimation;

const styles = StyleSheet.create({
  LottieStyle: {
    height: 400,
  },
});
