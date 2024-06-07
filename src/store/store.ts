import {create} from 'zustand';
import {produce} from 'immer';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';

export const useStore = create(
  persist(
    (set, get) => ({
      CoffeeList: CoffeeData,
      BeansList: BeansData,
      CartPrice: 0,
      FavoriteList: [],
      CartList: [],
      OrderHistoryList: [],

      addToCart: (cartItem: any) =>
        set(
          produce(state => {
            let found = false;

            // check if the item is in the cart list
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id === cartItem.id) {
                found = true;
                let size = false;

                // check if the size of the item is in the cart list
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (
                    state.CartList[i].prices[j].size === cartItem.prices[0].size
                  ) {
                    size = true;
                    state.CartList[i].prices[j].quantity++;
                    break;
                  }
                }

                // if the size of the item is not in the cart list, add it to the cart list
                if (size === false) {
                  state.CartList[i].prices.push(cartItem.prices[0]);
                }

                // sort the sizes of the item in the cart list
                state.CartList[i].prices.sort((a: any, b: any) => {
                  if (a.size > b.size) {
                    return -1;
                  }
                  if (a.size < b.size) {
                    return 1;
                  }
                  return 0;
                });
                break;
              }
            }

            // if the item is not in the cart list, add it to the cart list
            if (found === false) {
              state.CartList.push(cartItem);
            }
          }),
        ),

      calculateCartPrice: () =>
        set(
          produce(state => {
            let totalPrice = 0;
            // calculate the total price of the cart list
            for (let i = 0; i < state.CartList.length; i++) {
              let tempPrice = 0;
              // calculate the total price of the item in the cart list
              for (let j = 0; j < state.CartList[i].prices.length; j++) {
                tempPrice +=
                  parseFloat(state.CartList[i].prices[j].price) *
                  state.CartList[i].prices[j].quantity;
              }
              state.CartList[i].ItemPrice = tempPrice.toFixed(2).toString();
              totalPrice += tempPrice;
            }
            // convert the total price to string and store it in the CartPrice
            state.CartPrice = totalPrice.toFixed(2).toString();
          }),
        ),

      addToFavoriteList: (type: string, id: string) =>
        set(
          produce(state => {
            if (type === 'Coffee') {
              for (let i = 0; i < state.CoffeeList.length; i++) {
                // find the item in the CoffeeList
                if (state.CoffeeList[i].id === id) {
                  if (state.CoffeeList[i].favorite === false) {
                    state.CoffeeList[i].favorite = true;
                    state.FavoriteList.unshift(state.CoffeeList[i]);
                  } else {
                    state.CoffeeList[i].favorite = false;
                  }
                  break;
                }
              }
            } else if (type === 'Bean') {
              for (let i = 0; i < state.BeansList.length; i++) {
                // find the item in the BeansList
                if (state.BeansList[i].id === id) {
                  if (state.BeansList[i].favorite === false) {
                    state.BeansList[i].favorite = true;
                    state.FavoriteList.unshift(state.BeansList[i]);
                  } else {
                    state.BeansList[i].favorite = false;
                  }
                  break;
                }
              }
            }
          }),
        ),

      deleteFromFavoriteList: (type: string, id: string) =>
        set(
          produce(state => {
            if (type === 'Coffee') {
              for (let i = 0; i < state.CoffeeList.length; i++) {
                // find the item in the CoffeeList
                if (state.CoffeeList[i].id === id) {
                  if (state.CoffeeList[i].favorite === true) {
                    state.CoffeeList[i].favorite = false;
                  } else {
                    state.CoffeeList[i].favorite = true;
                  }
                  break;
                }
              }
            } else if (type === 'Bean') {
              for (let i = 0; i < state.BeansList.length; i++) {
                // find the item in the BeansList
                if (state.BeansList[i].id === id) {
                  if (state.BeansList[i].favorite === true) {
                    state.BeansList[i].favorite = false;
                  } else {
                    state.BeansList[i].favorite = true;
                  }
                  break;
                }
              }
            }
            // find the item in the FavoriteList and remove it
            let spliceIndex = -1;
            for (let i = 0; i < state.FavoriteList.length; i++) {
              if (state.FavoriteList[i].id === id) {
                spliceIndex = i;
                break;
              }
            }
            // remove the item from the FavoriteList
            state.FavoriteList.splice(spliceIndex, 1);
          }),
        ),

      incrementCartItemQuantity: (id: string, size: string) =>
        set(
          produce(state => {
            for (let i = 0; i < state.CartList.length; i++) {
              // find the item in the cart
              if (state.CartList[i].id === id) {
                // find the size of the item in the cart
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (state.CartList[i].prices[j].size === size) {
                    state.CartList[i].prices[j].quantity++;
                    break;
                  }
                }
                break;
              }
            }
          }),
        ),

      decrementCartItemQuantity: (id: string, size: string) =>
        set(
          produce(state => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id === id) {
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (state.CartList[i].prices[j].size === size) {
                    // if the item has more than one size
                    if (state.CartList[i].prices.length > 1) {
                      // if the quantity is more than 1, decrement the quantity otherwise remove the item from the cart
                      if (state.CartList[i].prices[j].quantity > 1) {
                        state.CartList[i].prices[j].quantity--;
                      } else {
                        state.CartList[i].prices.splice(j, 1);
                      }
                    }
                    // if the item has only one size
                    else {
                      if (state.CartList[i].prices[j].quantity > 1) {
                        state.CartList[i].prices[j].quantity--;
                      } else {
                        state.CartList.splice(i, 1);
                      }
                    }
                    break;
                  }
                }
              }
            }
          }),
        ),

      addToOrderHistoryListFromCart: () =>
        set(
          produce(state => {
            // calculate the total price of the current cart list
            let temp = state.CartList.reduce(
              (accumulator: number, currentValue: any) =>
                accumulator + parseFloat(currentValue.ItemPrice),
              0,
            );

            // convert the total price to string and store it in the OrderHistoryList
            let currentCartListTotalPrice = temp.toFixed(2).toString();

            // add the current cart list to the OrderHistoryList
            if (state.OrderHistoryList.length > 0) {
              state.OrderHistoryList.unshift({
                OrderDate:
                  new Date().toLocaleString() +
                  ' ' +
                  new Date().toLocaleTimeString(),
                CartList: state.CartList,
                CartListPrice: currentCartListTotalPrice,
              });
            } else {
              state.OrderHistoryList.push({
                OrderDate:
                  new Date().toLocaleString() +
                  ' ' +
                  new Date().toLocaleTimeString(),
                CartList: state.CartList,
                CartListPrice: currentCartListTotalPrice,
              });
            }

            // clear the current cart list
            state.CartList = [];
          }),
        ),
    }),

    // persist the store in the AsyncStorage
    {
      name: 'coffee-app',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
