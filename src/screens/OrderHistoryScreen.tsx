import React, {useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS} from '../theme/theme';
import {HeaderBar} from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import {PopUpAnimation} from '../components/PopUpAnimation';
import {OrderHistoryCard} from '../components/OrderHistoryCard';
import { useNav } from '../navigators/RootNavigation';

// Screen width and height
const screenWidth = Dimensions.get('window').width;

// Responsive width and height
const RPW = (percentage: number) => {
  return (percentage / 100) * screenWidth;
};

export const OrderHistoryScreen = () => {
  const navigation = useNav();
  const OrderHistoryList = useStore((state: any) => state.OrderHistoryList);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const tabBarHeight = useBottomTabBarHeight();

  const navigationHandler = ({index, id, type}: any) => {
    navigation.push('Details', {
      index,
      id,
      type,
    });
  };

  return (
    <View className="flex-1 bg-primaryBlackHex">
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.primaryBlackHex}
      />

      {/* PopUp Animation */}
      {showAnimation ? (
        <PopUpAnimation
          style={styles.LottieStyle}
          source={require('../lottie/download.json')}
        />
      ) : (
        <></>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: RPW(6)}}>
        <View style={{marginBottom: tabBarHeight}}>
          <View className="flex-1">
            {/* Call the custom Header component */}
            <HeaderBar title="Order History" />

            {OrderHistoryList.length === 0 ? (
              <EmptyListAnimation title={'No Order History'} />
            ) : (
              <View className="">
                {OrderHistoryList.map((data: any, index: any) => (
                  // Call the OrderHistoryCard component
                  <OrderHistoryCard
                    key={index.toString()}
                    navigationHandler={navigationHandler}
                    orderDate={data.OrderDate}
                    CartList={data.CartList}
                    CartListPrice={data.CartListPrice}
                  />
                ))}
              </View>
            )}

            {OrderHistoryList.length > 0 ? (
              <View className="mt-5">
                <TouchableOpacity
                  className="flex-1 items-center justify-center h-[60] rounded-2xl bg-primaryOrangeHex"
                  onPress={() => {
                    setShowAnimation(true);
                    setTimeout(() => {
                      setShowAnimation(false);
                    }, 2000);
                  }}>
                  <Text className="font-poppins_semibold text-lg text-primaryWhiteHex">
                    Download
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <></>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  LottieStyle: {
    height: 250,
  },
});
