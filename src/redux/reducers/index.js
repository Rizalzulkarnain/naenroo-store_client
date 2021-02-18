import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
import productsReducers from './productReducers'
import detailProductReducer from './productDetailReducer'
import authReducers from './authReducers'
import userReducers from './userReducers'

const rootReducers = combineReducers({
  toastr: toastrReducer,
  products: productsReducers,
  productDetail: detailProductReducer,
  auth: authReducers,
  user: userReducers
})

export default rootReducers
