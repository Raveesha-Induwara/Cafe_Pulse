import {
  Dimensions,
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTSIZE} from '../theme/theme';
import CustomIcon from './CustomIcon';
import BGIcon from './BGIcon';

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

interface CoffeeCardProps {
  id: string;
  index: number;
  type: string;
  roasted: string;
  imageLink_square: ImageProps;
  name: string;
  special_ingredient: string;
  average_rating: number;
  price: any;
  buttonPressHandler: any;
}

export const CoffeeCard: React.FC<CoffeeCardProps> = ({
  id,
  index,
  type,
  roasted,
  imageLink_square,
  name,
  special_ingredient,
  average_rating,
  price,
  buttonPressHandler,
}) => {
  return (
    <LinearGradient
      className="p-4 rounded-3xl"
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
      {/* Coffee Image */}
      <ImageBackground
        source={imageLink_square}
        style={styles.CardImageBG}
        resizeMode="cover">
        {/* Rating value */}
        <View className="flex-row absolute top-0 right-0 px-4 bg-primaryBlackRGBA rounded-bl-2xl rounded-tr-2xl gap-2 items-center justify-center">
          <CustomIcon name={'star'} color={COLORS.primaryOrangeHex} size={16} />
          <Text className="text-sm text-primaryWhiteHex font-poppins_medium">
            {average_rating}
          </Text>
        </View>
      </ImageBackground>

      {/* Coffee Title */}
      <Text className="text-base text-primaryWhiteHex font-poppins_medium">
        {' '}
        {name}{' '}
      </Text>

      {/* Ingredients Text */}
      <Text className="text-xs text-primaryWhiteHex font-poppins_light">
        {' '}
        {special_ingredient}{' '}
      </Text>

      {/* Bottom Section */}
      <View className="flex-row mt-4 justify-between items-center">
        {/* Price */}
        <Text className="text-lg text-primaryOrangeHex font-poppins_semibold">
          $ <Text className="text-primaryWhiteHex">{price}</Text>
        </Text>

        {/* Add to Cart Icon */}
        <TouchableOpacity
          onPress={() => {
            buttonPressHandler({
              id,
              index,
              type,
              roasted,
              imageLink_square,
              name,
              special_ingredient,
              prices: [{...price, quantity: 1}],
            });
          }}>
          {/* Icon */}
          <BGIcon
            color={COLORS.primaryWhiteHex}
            name={'add'}
            BGColor={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_10}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  CardImageBG: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: 20,
    marginBottom: 15,
    overflow: 'hidden',
  },
});
