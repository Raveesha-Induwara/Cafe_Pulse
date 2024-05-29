import React, {useState} from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../theme/theme';
import {useStore} from '../store/store';
import {ImageBackgroundInfo} from '../components/ImageBackgroundInfo';
import {PaymentFooter} from '../components/PaymentFooter';
import classNames from 'classnames';

export const DetailsScreen = ({navigation, route}: any) => {
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList,
  );
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const ItemOfIndex = useStore((state: any) =>
    route.params.type === 'Coffee' ? state.CoffeeList : state.BeansList,
  )[route.params.index];

  const [fullDesc, setFullDesc] = useState(false);
  const [price, setPrice] = useState(ItemOfIndex.prices[0]);

  const BackHandler = () => {
    navigation.pop();
  };

  const ToggleFavorite = (favorite: boolean, type: string, id: string) => {
    favorite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };

  // Add to cart handler function
  const addToCardHandler = ({
    id,
    index,
    name,
    roasted,
    imageLink_square,
    special_ingredient,
    type,
    price,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imageLink_square,
      special_ingredient,
      type,
      prices: [{...price, quantity: 1}],
    });
    calculateCartPrice();
    navigation.navigate('Cart');
  };

  return (
    <View className="flex-1 bg-primaryBlackHex">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      <ScrollView className="flex-grow" showsVerticalScrollIndicator={false}>
        <ImageBackgroundInfo
          EnableBackHandler={true}
          imageLink_portrait={ItemOfIndex.imagelink_portrait}
          type={ItemOfIndex.type}
          id={ItemOfIndex.id}
          favorite={ItemOfIndex.favorite}
          name={ItemOfIndex.name}
          special_ingredient={ItemOfIndex.special_ingredient}
          ingredients={ItemOfIndex.ingredients}
          average_rating={ItemOfIndex.average_rating}
          ratings_count={ItemOfIndex.ratings_count}
          roasted={ItemOfIndex.roasted}
          BackHandler={BackHandler}
          ToggleFavorite={ToggleFavorite}
        />

        <View className="p-5">
          <Text className="mb-3 font-poppins_semibold text-base text-primaryWhiteHex">
            Description
          </Text>
          {fullDesc ? (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc(prev => !prev);
              }}>
              <Text className="mb-7 font-poppins_regular text-sm text-primaryWhiteHex">
                {ItemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc(prev => !prev);
              }}>
              <Text
                numberOfLines={3}
                className="mb-7 font-poppins_regular text-sm text-primaryWhiteHex">
                {ItemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          )}

          <Text className="mb-3 font-poppins_semibold text-base text-primaryWhiteHex">
            Size
          </Text>
          <View className="flex-1 flex-row justify-between gap-5">
            {ItemOfIndex.prices.map((data: any) => (
              <TouchableOpacity
                key={data.size}
                onPress={() => setPrice(data)}
                className={classNames(
                  'flex-1 bg-primaryDarkGreyHex items-center justify-center h-12 rounded-xl border-2 border-primaryDarkGreyHex',
                  {'border-primaryOrangeHex': data.size === price.size},
                )}>
                <Text
                  className={classNames(
                    'font-poppins_medium text-base text-primaryLightGreyHex',
                    {
                      'text-sm': ItemOfIndex.type === 'bean',
                      'text-primaryOrangeHex': data.size === price.size,
                    },
                  )}>
                  {data.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Call the PaymentFooter component */}
        <PaymentFooter
          price={price}
          buttonTitle={'Add To Cart'}
          buttonPressHandler={() => {
            addToCardHandler({
              id: ItemOfIndex.id,
              index: ItemOfIndex.index,
              name: ItemOfIndex.name,
              roasted: ItemOfIndex.roasted,
              imageLink_square: ItemOfIndex.imagelink_square,
              special_ingredient: ItemOfIndex.special_ingredient,
              type: ItemOfIndex.type,
              price: price,
            });
          }}
        />
      </ScrollView>
    </View>
  );
};
