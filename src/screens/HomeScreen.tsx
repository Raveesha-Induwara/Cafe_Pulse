import React, {useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {StatusBar} from 'react-native';
import {COLORS} from '../theme/theme';
import {HeaderBar} from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';
import {CoffeeCard} from '../components/CoffeeCard';
import classNames from 'classnames';

// Get screen dimension
const screenWidth = Dimensions.get('window').width;

// RPW is a function to set responsive width
const RPW = (percentage: number) => {
  return (percentage / 100) * screenWidth;
};

// get data from Coffee list
const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] === undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const getCoffeeList = (category: string, data: any) => {
  if (category === 'All') {
    return data;
  } else {
    let coffeeList = data.filter((item: any) => item.name === category);
    return coffeeList;
  }
};

const HomeScreen = ({navigation}: any) => {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeansList = useStore((state: any) => state.BeansList);
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const [categories, setCategories] = useState(
    getCategoriesFromData(CoffeeList),
  );
  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({
    index: 1,
    category: categories[0],
  });

  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, CoffeeList),
  );

  const ListRef: any = useRef<FlatList>();
  const tabBarHeight = useBottomTabBarHeight();

  const searchCoffee = (search: string) => {
    if (search !== '') {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setCategoryIndex({index: 0, category: categories[0]});
      setSortedCoffee([
        ...CoffeeList.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        ),
      ]);
    }
  };

  const reSetSearchCoffee = () => {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCategoryIndex({index: 0, category: categories[0]});
    setSortedCoffee([...CoffeeList]);
    setSearchText('');
  };

  const addToCardHandler = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    price,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices: [{...price, quantity: 1}],
    });
    calculateCartPrice();
    ToastAndroid.showWithGravity(
      `${name} is Added to Cart`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  return (
    <View className="flex-1 bg-primaryBlackHex">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        className="flex-grow"
        showsHorizontalScrollIndicator={false}
        style={{paddingHorizontal: RPW(6)}}>
        {/* App Header */}
        <HeaderBar title="Home Screen" />

        <Text className="text-3xl font-poppins_semibold text-primaryWhiteHex">
          Find the best coffee{'\n'}coffee for you
        </Text>

        {/* Search Input */}
        <View className="flex-row my-8 px-5 rounded-2xl bg-primaryDarkGreyHex items-center">
          {/* <TouchableOpacity onPress={() => {
              searchCoffee(searchText);
            }}
          > */}
          <CustomIcon
            name="search"
            size={18}
            color={
              searchText.length > 0
                ? COLORS.primaryOrangeHex
                : COLORS.primaryLightGreyHex
            }
          />
          {/* </TouchableOpacity> */}
          <TextInput
            className="flex-1 ml-5 h-14 text-base font-poppins_medium text-primaryWhiteHex"
            placeholder="Find Your Coffee..."
            placeholderTextColor={COLORS.primaryLightGreyHex}
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
              searchCoffee(text);
            }}
          />

          {searchText.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                reSetSearchCoffee();
              }}>
              <CustomIcon
                name="close"
                color={COLORS.primaryLightGreyHex}
                size={18}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>

        {/* Category Scroller */}

        <ScrollView
          className="mb-5"
          horizontal
          showsHorizontalScrollIndicator={false}>
          {categories.map((data, index) => (
            <View className="px-4" key={index.toString()}>
              <TouchableOpacity
                className="items-center"
                onPress={() => {
                  ListRef?.current?.scrollToOffset({
                    animated: true,
                    offset: 0,
                  });
                  setCategoryIndex({index: index, category: categories[index]});
                  setSortedCoffee([
                    ...getCoffeeList(categories[index], CoffeeList),
                  ]);
                }}>
                <Text
                  className={classNames(
                    'mb-1 font-poppins_semibold text-base text-primaryLightGreyHex',
                    {'text-primaryOrangeHex': categoryIndex.index === index},
                  )}>
                  {data}
                </Text>
                {/* Dot Indicator */}
                {categoryIndex.index === index ? (
                  <View className="h-2 w-2 rounded-full bg-primaryOrangeHex" />
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Coffee Flat List */}

        <FlatList
          className="py-5"
          ref={ListRef}
          ListEmptyComponent={
            <View
              className="items-center justify-center"
              style={styles.EmptyListContainer}>
              <Text className="mb-1 font-poppins_semibold text-base text-primaryLightGreyHex">
                No Coffee Available
              </Text>
            </View>
          }
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <View className="pl-5">
                {/* Click on Coffee --> navigate to the Details Screen */}
                <TouchableOpacity
                  onPress={() => {
                    navigation.push('Details', {
                      index: item.index,
                      id: item.id,
                      type: item.type,
                    });
                  }}>
                  {/* Call CoffeeCard Component */}
                  <CoffeeCard
                    id={item.id}
                    index={item.index}
                    type={item.type}
                    roasted={item.roasted}
                    imageLink_square={item.imagelink_square}
                    name={item.name}
                    special_ingredient={item.special_ingredient}
                    average_rating={item.average_rating}
                    price={item.prices[2].price}
                    buttonPressHandler={addToCardHandler}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />

        <Text className="mt-5 text-lg text-secondaryLightGreyHex font-poppins_medium">
          Coffee Beans
        </Text>

        {/* Beans Flat List */}

        <FlatList
          className="py-5"
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[{marginBottom: tabBarHeight}]}
          data={BeansList}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <View className="pl-5">
                {/* Click on Beans --> navigate to the Details Screen */}
                <TouchableOpacity
                  onPress={() => {
                    navigation.push('Details', {
                      index: item.index,
                      id: item.id,
                      type: item.type,
                    });
                  }}>
                  {/* Call CoffeeCard Component */}
                  <CoffeeCard
                    id={item.id}
                    index={item.index}
                    type={item.type}
                    roasted={item.roasted}
                    imageLink_square={item.imagelink_square}
                    name={item.name}
                    special_ingredient={item.special_ingredient}
                    average_rating={item.average_rating}
                    price={item.prices[2].price}
                    buttonPressHandler={addToCardHandler}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  EmptyListContainer: {
    width: RPW(88),
    paddingVertical: 36 * 3.4,
  },
});
