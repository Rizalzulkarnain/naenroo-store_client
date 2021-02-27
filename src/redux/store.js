import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as toastrReducer } from 'react-redux-toastr';

import productsReducers from './reducers/productReducers';
import detailProductReducer from './reducers/productDetailReducer';
import authReducers from './reducers/authReducers';
import userReducers from './reducers/userReducers';
import passwordReducers from './reducers/passwordReducers';
import cartReducers from './reducers/cartReducers';

const rootReducers = combineReducers({
  products: productsReducers,
  productDetail: detailProductReducer,
  auth: authReducers,
  user: userReducers,
  password: passwordReducers,
  cart: cartReducers,
  toastr: toastrReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {},
  },
};

const middleware = [thunk];
const store = createStore(
  rootReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
