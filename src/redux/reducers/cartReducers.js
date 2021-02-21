import * as Constant from '../constants/cartContants';

const cartState = {
  cartItems: [],
};

const cartReducers = (state = cartState, action) => {
  switch (action.type) {
    case Constant.ADD_TO_CART:
      const item = action.payload;

      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    default:
      return state;
  }
};

export default cartReducers;
