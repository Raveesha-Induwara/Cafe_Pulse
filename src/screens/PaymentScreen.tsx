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
import {COLORS} from '../theme/theme';
import GradientBGIcon from '../components/GradientBGIcon';
import {PaymentMethod} from '../components/PaymentMethod';
import {PaymentFooter} from '../components/PaymentFooter';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';
import classNames from 'classnames';
import {useStore} from '../store/store';
import {PopUpAnimation} from '../components/PopUpAnimation';

const paymentList = [
  {
    name: 'Wallet',
    icon: 'wallet',
    isIcon: true,
  },
  {
    name: 'Google Pay',
    icon: require('../assets/app_images/gpay.png'),
    isIcon: false,
  },
  {
    name: 'Apple Pay',
    icon: require('../assets/app_images/applepay.png'),
    isIcon: false,
  },
  {
    name: 'Amazon Pay',
    icon: require('../assets/app_images/amazonpay.png'),
    isIcon: false,
  },
];

// Get screen dimension
const screenWidth = Dimensions.get('window').width;

// RPW is a function to set responsive width
const RPW = (percentage: number) => {
  return (percentage / 100) * screenWidth;
};

export const PaymentScreen = ({navigation, route}: any) => {
  const [paymentMode, setPaymentMode] = useState('Credit Card');
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const addToOrderHistoryListFromCart = useStore(
    (state: any) => state.addToOrderHistoryListFromCart,
  );

  // Pay Button Press Handler
  const buttonPressHandler = () => {
    setShowAnimation(true);
    addToOrderHistoryListFromCart();
    calculateCartPrice();
    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate('History');
    }, 2000);
  };

  const BackHandler = () => {
    navigation.pop();
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
          source={require('../lottie/successful.json')}
        />
      ) : (
        <></>
      )}

      {/* Payment Card Screen Design */}
      <ScrollView
        className="flex-grow"
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: RPW(6)}}>
        {/* Header Section */}
        <View className="flex-row py-4 justify-between items-center">
          <TouchableOpacity onPress={() => BackHandler()}>
            <GradientBGIcon
              name="left"
              color={COLORS.primaryLightGreyHex}
              size={16}
            />
          </TouchableOpacity>
          <Text className="text-xl font-poppins_semibold text-primaryWhiteHex">
            Payments
          </Text>
          <View className="w-8" />
        </View>

        {/* Payment Details Section */}
        <View className="gap-4">
          {/* Credit Card */}
          <TouchableOpacity onPress={() => setPaymentMode('Credit Card')}>
            <View
              className={classNames(
                'p-3 rounded-3xl border-2 overflow-hidden',
                {
                  'border-primaryOrangeHex': paymentMode === 'Credit Card',
                },
              )}>
              <Text className="mb-2 text-base font-poppins_semibold text-primaryWhiteHex">
                Credit Card
              </Text>

              {/* Credit Card Design */}
              <View className="rounded-2xl overflow-hidden">
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                  className="px-4 pb-4">
                  {/* Credit Card Icon */}
                  <View className="flex-row justify-between items-center">
                    <CustomIcon
                      name="chip"
                      size={40}
                      color={COLORS.primaryOrangeHex}
                    />
                    <CustomIcon
                      name="visa"
                      size={60}
                      color={COLORS.primaryWhiteHex}
                    />
                  </View>

                  {/* Credit Card No */}
                  <View className="mt-3 justify-center">
                    <Text className="text-base tracking-[4] font-poppins_semibold text-primaryWhiteHex">
                      {'4705  5632  8540  1234'}
                    </Text>
                  </View>

                  <View className="flex-row mt-7 justify-between">
                    <View className="gap-1">
                      <Text className="text-xs font-poppins_regular text-secondaryLightGreyHex">
                        Card Holder
                      </Text>
                      <Text className="text-base font-poppins_medium text-primaryWhiteHex">
                        John Doe
                      </Text>
                    </View>

                    <View className="items-end gap-1">
                      <Text className="text-xs font-poppins_regular text-secondaryLightGreyHex">
                        Expiry Date
                      </Text>
                      <Text className="text-base font-poppins_medium text-primaryWhiteHex">
                        12/24
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </TouchableOpacity>

          {/* Payment Options */}
          {paymentList.map((data: any) => (
            <TouchableOpacity
              key={data.name}
              onPress={() => {
                setPaymentMode(data.name);
              }}>
              <PaymentMethod
                paymentMode={paymentMode}
                name={data.name}
                icon={data.icon}
                isIcon={data.isIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <PaymentFooter
        price={{price: route.params.amount, currency: '$'}}
        buttonTitle={`Pay with ${paymentMode}`}
        buttonPressHandler={buttonPressHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  LottieStyle: {
    flex: 1,
  },
});
