import React from 'react';
import {Image, View} from 'react-native';

const ProfilePic = () => {
  return (
    <View className="w-10 h-10 rounded-xl border-2 border-secondaryDarkGreyHex justify-center items-center overflow-hidden">
      <Image
        source={require('../assets/app_images/avatar.png')}
        className="w-9 h-9"
      />
    </View>
  );
};

export default ProfilePic;
