import { State } from "./state";


export type Action =
  | {
      type: "ADD_TO_CART";
      payload: number;
    }
  | {
      type: "REMOVE_FROM_CART";
      payload: number;
    }
  | {
    type: "EMPTY_CART";
    payload: number
  }


  export const addToCart = (toAdd = 1): Action => {
    return { type: "ADD_TO_CART", payload: toAdd };
  };
  export const removeFromCart = (toDeduct = 1): Action => {
    return { type: "REMOVE_FROM_CART", payload: toDeduct };
  };
  export const emptyCart = (zero = 0): Action => {
    return { type: "EMPTY_CART", payload: zero }
  }
  
  



export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartBadge: state.cartBadge + action.payload
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartBadge: state.cartBadge - action.payload
      };
    case "EMPTY_CART":
      return {
        ...state,
        cartBadge: action.payload
      }
    default:
      return state;
  }
};
