import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import EmptyListAnimation from '../components/EmptyListAnimation';
import {HeaderBar} from '../components/HeaderBar';
import {COLORS} from '../theme/theme';
import {useStore} from '../store/store';
import {FavoritesItemCard} from '../components/FavoritesItemCard';

// Screen width and height
const screenWidth = Dimensions.get('window').width;

// Responsive width and height
const RPW = (percentage: number) => {
  return (percentage / 100) * screenWidth;
};

export const FavoriteScreen = ({navigation}: any) => {
  const FavoriteList = useStore((state: any) => state.FavoriteList);
  const tabBarHeight = useBottomTabBarHeight();
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList,
  );

  const ToggleFavorite = (favorite: boolean, type: string, id: string) => {
    favorite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };

  return (
    <View className="flex-1 bg-primaryBlackHex">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: RPW(6)}}>
        <View style={{marginBottom: tabBarHeight}}>
          <View className="flex-1">
            {/* Call the custom Header component */}
            <HeaderBar title="Favorites" />

            {FavoriteList.length === 0 ? (
              <EmptyListAnimation title={'No Favorites'} />
            ) : (
              <View className="gap-5">
                {FavoriteList.map((data: any) => (
                  // Call the custom FavoriteCardItem component
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}>
                    <FavoritesItemCard
                      id={data.id}
                      name={data.name}
                      type={data.type}
                      imageLink_portrait={data.imagelink_portrait}
                      special_ingredients={data.special_ingredients}
                      ingredients={data.ingredients}
                      averageRating={data.average_rating}
                      ratingCount={data.ratings_count}
                      roasted={data.roasted}
                      description={data.description}
                      favorite={data.favorite}
                      ToggleFavoriteItem={() => ToggleFavorite}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
