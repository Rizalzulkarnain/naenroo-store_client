import * as API from '../../services/Api';
import * as Constant from '../constants/cartContants';

export const addToCartAction = (id, quantity) => async (dispatch, getState) => {
  const { data: response } = await API.fetchDetailProduct(id);
  dispatch({
    type: Constant.ADD_TO_CART,
    payload: {
      id: response.data._id,
      name: response.data.name,
      price: response.data.price,
      image: response.data.images[0].url,
      stock: response.data.stock,
      quantity: quantity,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
