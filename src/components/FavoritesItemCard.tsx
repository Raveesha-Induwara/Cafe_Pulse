import {View, Text, ImageProps} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../theme/theme';
import {ImageBackgroundInfo} from './ImageBackgroundInfo';

interface FavoritesItemCardProps {
  id: string;
  name: string;
  type: string;
  imageLink_portrait: ImageProps;
  special_ingredients: string;
  ingredients: string;
  averageRating: number;
  ratingCount: string;
  roasted: string;
  description: string;
  favorite: string;
  ToggleFavoriteItem: any;
}

export const FavoritesItemCard: React.FC<FavoritesItemCardProps> = ({
  id,
  name,
  type,
  imageLink_portrait,
  special_ingredients,
  ingredients,
  averageRating,
  ratingCount,
  roasted,
  description,
  favorite,
  ToggleFavoriteItem,
}) => {
  return (
    <View className="rounded-3xl overflow-hidden">
      <ImageBackgroundInfo
        EnableBackHandler={false}
        imageLink_portrait={imageLink_portrait}
        type={type}
        id={id}
        favorite={favorite}
        name={name}
        special_ingredient={special_ingredients}
        ingredients={ingredients}
        average_rating={averageRating}
        ratings_count={ratingCount}
        roasted={roasted}
        ToggleFavorite={ToggleFavoriteItem}
      />
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        className="gap-3 p-5">
        <Text className="font-poppins_semibold text-base text-secondaryLightGreyHex">
          Description
        </Text>
        <Text className="font-poppins_regular text-sm text-primaryWhiteHex">
          {description}
        </Text>
      </LinearGradient>
    </View>
  );
};
