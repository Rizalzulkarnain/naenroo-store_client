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
import orderDetailsReducers from './orderDetailsReducers';
import NewReviewReducers from './NewReviewReducers';
import adminProductsReducers from './adminProductReducer';
import createAdminProductReducers from './createAdminProductReducer';
import deleteAdminProductReducers from './deleteAdminProductReducer';
import updateAdminProductReducers from './updateAdminProductReducer';
import ordersAdminReducers from './ordersAdminReducers';
import updateOrderReducers from './updateOrderReducers';
import deleteOrderReducers from './deleteOrderReducers';
import allUsersReducers from './allUsersReducers';
import userDetailReducers from './userDetailReducers';
import updateUserReducers from './updateUserReducers';
import deleteUserReducers from './deleteUserReducers';
import getReviewsReducers from './getReviewsReducers';
import deleteReviewReducers from './deleteReviewReducers';

const rootReducers = combineReducers({
  products: productsReducers,
  productDetail: detailProductReducer,
  auth: authReducers,
  user: userReducers,
  password: passwordReducers,
  cart: cartReducers,
  newOrder: newOrderReducers,
  myOrders: ordersReducers,
  orderDetails: orderDetailsReducers,
  newReview: NewReviewReducers,
  adminProducts: adminProductsReducers,
  createAdminProduct: createAdminProductReducers,
  deleteAdminProduct: deleteAdminProductReducers,
  updateAdminProduct: updateAdminProductReducers,
  allOrders: ordersAdminReducers,
  updateOrder: updateOrderReducers,
  deleteOrder: deleteOrderReducers,
  allUsers: allUsersReducers,
  userDetails: userDetailReducers,
  updateUser: updateUserReducers,
  deleteUser: deleteUserReducers,
  reviews: getReviewsReducers,
  deleteReview: deleteReviewReducers,
  toastr: toastrReducer,
});

export default rootReducers;
