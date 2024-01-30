import { create } from 'zustand';
import { produce } from 'immer';
import { persist, createJSONStorage } from 'zustand/middleware';
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

               addToCart: (cartItem: any) => set(produce(state => {
                    let found = false;
                    for (let i = 0; i < state.CartList.length; i++){
                         if (state.CartList[i].id === cartItem.id){
                              found = true;
                              let size = false;
                              for (let j = 0; j < state.CartList[i].prices.length; j++){
                                   if (state.CartList[i].prices[j].size === cartItem.prices[0].size){
                                        size = true;
                                        state.CartList[i].prices[j].quantity++;
                                        break;
                                   }
                              }
                              if (size === false) {
                                   state.CartList[i].prices.push(cartItem.prices[0]);
                              }
                              state.CartList[i].prices.sort((a: any, b: any) => {
                                   if (a.size > b.size)
                                        {return -1;}
                                   if (b.size > a.size)
                                        {return 1;}
                                   return 0;
                              });
                              break;
                         }
                    }
                    if (found === false)
                         {state.CartList.push(cartItem);}
               })),

               calculateCartPrice: () => set(produce(state => {
                    let totalPrice = 0;
                    for (let i = 0; i < state.CartList.length; i++) {
                         let tempPrice = 0;
                         for (let j = 0; j < state.CartList[i].prices.length; j++) {
                              tempPrice += parseFloat(state.CartList[i].prices[j].price) * state.CartList[i].prices[j].quantity;
                         }
                         state.CartList[i].ItemPrice = tempPrice.toFixed(2).toString();
                         totalPrice += tempPrice;
                    }
                    state.CartPrice = totalPrice.toFixed(2).toString();
               })),

               addToFavoriteList: (type: string, id: string) => set(produce(state => {
                    if (type === 'Coffee') {
                         for (let i = 0; i < state.CoffeeList.length; i++) {
                              if (state.CoffeeList[i].id === id) {
                                   if (state.CoffeeList[i].favorite === false){
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
                              if (state.BeansList[i].id === id) {
                                   if (state.BeansList[i].favorite === false){
                                        state.BeansList[i].favorite = true;
                                        state.FavoriteList.unshift(state.BeansList[i]);
                                   } else {
                                        state.BeansList[i].favorite = false;
                                   }
                                   break;
                              }
                         }
                    }
               })),

               deleteFromFavoriteList: (type: string, id: string) => set(produce(state => {
                    if (type === 'Coffee') {
                         for (let i = 0; i < state.CoffeeList.length; i++) {
                              if (state.CoffeeList[i].id === id) {
                                   if (state.CoffeeList[i].favorite === true){
                                        state.CoffeeList[i].favorite = false;
                                   } else {
                                        state.CoffeeList[i].favorite = true;
                                   }
                                   break;
                              }
                         }
                    } else if (type === 'Bean') {
                         for (let i = 0; i < state.BeansList.length; i++) {
                              if (state.BeansList[i].id === id) {
                                   if (state.BeansList[i].favorite === true){
                                        state.BeansList[i].favorite = false;
                                   } else {
                                        state.BeansList[i].favorite = true;
                                   }
                                   break;
                              }
                         }
                    }
                    let spliceIndex = -1;
                    for (let i = 0; i < state.FavoriteList.length; i++) {
                         if (state.FavoriteList[i].id === id) {
                              spliceIndex = i;
                              break;
                         }
                    }
                    state.FavoriteList.splice(spliceIndex, 1);
               })),
          }),
          {
               name: 'coffee-app',
               storage: createJSONStorage(() => AsyncStorage),
          }
     ),
);
