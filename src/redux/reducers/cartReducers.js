import * as Constant from '../constants/cartContants';

const cartState = {
  cartItems: [],
  shippingInfo: {},
};

const cartReducers = (state = cartState, action) => {
  switch (action.type) {
    case Constant.ADD_TO_CART:
      const itemExist = state.cartItems.find(
        (i) => i.product === action.payload.product
      );

      if (itemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === itemExist.product ? action.payload : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }

    case Constant.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };

    case Constant.SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducers;
