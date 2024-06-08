import React from 'react';
import {
  View,
  Text,
  ImageProps,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import GradientBGIcon from './GradientBGIcon';
import {COLORS, SPACING} from '../theme/theme';
import CustomIcon from './CustomIcon';
import classNames from 'classnames';

interface ImageBackgroundInfoProps {
  EnableBackHandler: boolean;
  imageLink_portrait: ImageProps;
  type: string;
  id: string;
  favorite: string;
  name: string;
  special_ingredient: string;
  ingredients: string;
  average_rating: number;
  ratings_count: string;
  roasted: string;
  BackHandler?: any;
  ToggleFavorite: any;
}

export const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
  EnableBackHandler,
  imageLink_portrait,
  type,
  id,
  favorite,
  name,
  special_ingredient,
  ingredients,
  average_rating,
  ratings_count,
  roasted,
  BackHandler,
  ToggleFavorite,
}) => {
  return (
    <View>
      <ImageBackground
        source={imageLink_portrait}
        className="w-full aspect-[4/5] justify-between">
        {EnableBackHandler ? (
          // Back button and favorite button container
          <View className="p-[30] flex-row justify-between">
            <TouchableOpacity
              onPress={() => {
                BackHandler();
              }}>
              <GradientBGIcon
                name="left"
                color={COLORS.primaryLightGreyHex}
                size={16}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                ToggleFavorite(favorite, type, id);
              }}>
              <GradientBGIcon
                name="like"
                color={
                  favorite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
                }
                size={16}
              />
            </TouchableOpacity>
          </View>
        ) : (
          // Favorite button container
          <View className="p-[30] flex-row flex-end">
            <TouchableOpacity
              onPress={() => {
                ToggleFavorite(favorite, type, id);
              }}>
              <GradientBGIcon
                name="like"
                color={
                  favorite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
                }
                size={16}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* Image Info outer container */}
        <View className="py-6 px-[30] bg-primaryBlackRGBA rounded-t-[40]">
          <View className="gap-4 justify-between">
            <View className="flex-row justify-between items-center">
              {/* Item Title container */}
              <View>
                {/* Item title */}
                <Text className="font-poppins_semibold text-2xl text-primaryWhiteHex">
                  {name}
                </Text>
                {/* Item Ingredients */}
                <Text className="font-poppins_medium text-xs text-primaryWhiteHex">
                  {special_ingredient}
                </Text>
              </View>
              {/* Item properties container */}
              <View className="flex-row items-center gap-5">
                <View className="w-14 h-14 bg-primaryBlackHex rounded-2xl justify-center items-center">
                  <CustomIcon
                    name={type === 'Bean' ? 'bean' : 'beans'}
                    size={type === 'Bean' ? 18 : 24}
                    color={COLORS.primaryOrangeHex}
                  />
                  <Text
                    className={classNames(
                      'font-poppins_medium text-xs text-primaryWhiteHex',
                      {
                        'mt-1.5': type === 'Bean',
                      },
                    )}>
                    {type}
                  </Text>
                </View>
                <View className="w-14 h-14 bg-primaryBlackHex rounded-2xl justify-center items-center">
                  <CustomIcon
                    name={type === 'Bean' ? 'location' : 'drop'}
                    size={16}
                    color={COLORS.primaryOrangeHex}
                  />
                  <Text className="mt-1.5 font-poppins_medium text-xs text-primaryWhiteHex">
                    {ingredients}
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex-row justify-between items-center">
              {/* Rating container */}
              <View className="flex-row items-center gap-2">
                <CustomIcon
                  name="star"
                  color={COLORS.primaryOrangeHex}
                  size={SPACING.space_20}
                />
                <Text className="font-poppins_semibold text-lg text-primaryWhiteHex">
                  {average_rating}
                </Text>
                <Text className="font-poppins_regular text-sm text-primaryWhiteHex">
                  ({ratings_count})
                </Text>
              </View>
              {/* Roasted Container */}
              <View className="h-14 px-4 bg-primaryBlackHex rounded-2xl justify-center items-center">
                <Text className="font-poppins_regular text-xs text-primaryWhiteHex">
                  {roasted}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
