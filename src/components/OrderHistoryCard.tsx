import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {OrderItemCard} from './OrderItemCard';

interface OrderHistoryCardProps {
  key: string;
  navigationHandler: any;
  orderDate: string;
  CartList: any;
  CartListPrice: string;
}

export const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({
  navigationHandler,
  orderDate,
  CartList,
  CartListPrice,
}) => {
  return (
    <View className="mb-8">
      {/* Order date and Total amount */}
      <View className="flex-row mb-2 justify-between">
        <View className="gap-1">
          <Text className="text-base font-poppins_semibold text-primaryWhiteHex">
            Order Date
          </Text>
          <Text className="text-sm font-poppins_medium text-secondaryLightGreyHex">
            {orderDate}
          </Text>
        </View>
        <View className="gap-1 items-end">
          <Text className="text-base font-poppins_semibold text-primaryWhiteHex">
            Total amount
          </Text>
          <Text className="text-base font-poppins_medium text-primaryOrangeHex">
            {'$ '}
            {CartListPrice}
          </Text>
        </View>
      </View>

      {/* Order Items */}
      <View className="gap-4">
        {CartList.map((data: any, index: any) => (
          <TouchableOpacity
            key={index.toString() + data.id}
            onPress={() => {
              navigationHandler({
                index: data.index,
                id: data.id,
                type: data.type,
              });
            }}>
            <OrderItemCard
              type={data.type}
              name={data.name}
              imageLink_square={data.imageLink_square}
              special_ingredient={data.special_ingredient}
              prices={data.prices}
              itemPrice={data.ItemPrice}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
