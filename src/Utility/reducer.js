import { useReducer } from "react";
import { Type } from "./Actiontype.js";

export const initialState = {
  basket: [],
  user:null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      // Check if item already exists in the basket
      const existingItem = state.basket.find(item => item.id === action.item.id);
      if (!existingItem) {
        // If item does not exist, add it with an amount of 1
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }]
        };
      } else {
        // If item exists, increase its amount by 1
        const updatedBasket = state.basket.map(item =>
          item.id === action.item.id ? { ...item, amount: item.amount + 1 } : item
        );
        return {
          ...state,
          basket: updatedBasket
        };
      }

    case Type.REMOVE_FROM_BASKET:
      // Find the index of the item to be removed
      const index = state.basket.findIndex(item => item.id === action.id);
      let newBasket = [...state.basket];

      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          // If item amount is greater than 1, decrease the amount by 1
          newBasket[index] = { ...newBasket[index], amount: newBasket[index].amount - 1 };
        } else {
          // If item amount is 1, remove the item from the basket
          newBasket.splice(index, 1);
        }
      }

      return {
        ...state,
        basket: newBasket
      };
       case Type.EMPTY_BASKET:
        return{
          ...state,
          basket:[]
        }

      case Type.SET_USER:
        return{
          ...state,
          user:action.user
        }
    default:
      return state;
  }
};
