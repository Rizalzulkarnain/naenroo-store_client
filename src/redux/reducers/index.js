import { combineReducers } from 'redux';

import { reducer as toastrReducer } from 'react-redux-toastr';

import productsReducers from './productReducers';
import detailProductReducer from './productDetailReducer';
import authReducers from './authReducers';
import userReducers from './userReducers';
import passwordReducers from './passwordReducers';
import cartReducers from './cartReducers';
import newOrderReducers from './newOrderReducers';
import ordersReducers from './ordersReducers';

const rootReducers = combineReducers({
  products: productsReducers,
  productDetail: detailProductReducer,
  auth: authReducers,
  user: userReducers,
  password: passwordReducers,
  cart: cartReducers,
  newOrder: newOrderReducers,
  myOrders: ordersReducers,
  toastr: toastrReducer,
});

export default rootReducers;
