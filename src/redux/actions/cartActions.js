import * as API from '../../services/Api';
import * as Constant from '../constants/cartContants';

export const addToCartAction = (id, quantity) => async (dispatch, getState) => {
  const { data: response } = await API.fetchDetailProduct(id);
  dispatch({
    type: Constant.ADD_TO_CART,
    payload: {
      product: response.data._id,
      name: response.data.name,
      price: response.data.price,
      image: response.data.images[0].url,
      stock: response.data.stock,
      quantity: quantity,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeItemFromCartAction = (id) => (dispatch, getState) => {
  dispatch({
    type: Constant.REMOVE_FROM_CART,
    payload: id,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
