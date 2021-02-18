import * as API from '../../services/Api'
import * as Constant from '../constants/productConstants'

export const getDetailProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: Constant.PRODUCT_DETAIL_REQUEST
    })

    const { data: response } = await API.fetchDetailProduct(id)
    dispatch({
      type: Constant.PRODUCT_DETAIL_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: Constant.PRODUCT_DETAIL_ERROR,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}
