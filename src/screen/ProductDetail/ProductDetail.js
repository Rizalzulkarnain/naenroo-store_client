import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { Carousel } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { getDetailProduct } from '../../redux/actions/productDetailAction'
import { clearErrors } from '../../redux/actions/productsAction'
import { toastr } from 'react-redux-toastr'

import MetaData from '../../components/MetaData'
import Spinner from '../../components/Spinner/Spinner'

const ProductDetail = ({ match }) => {
  const dispatch = useDispatch()
  const { loading, error, product } = useSelector((state) => state.productDetail)

  const {id} = match.params
  useEffect(() => {
    if (error) {
      toastr.error('Error Fetching Product Detail', error)
      dispatch(clearErrors())
    }

    dispatch(getDetailProduct(id))
  }, [dispatch, toastr, error, id])

  return (
    <div className='container container-fluid'>
      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <MetaData title={product.name} />
          <div className='row f-flex justify-content-around'>
            <div className='col-12 col-lg-5 img-fluid' id='product_image'>
              <Carousel pause='hover'>
                {product.images &&
                  product.images.map((image) => {
                    return (
                      <Carousel.Item key={image.public_id}>
                        <img className='d-block w-100' src={image.url} alt={product.title} />
                      </Carousel.Item>
                    )
                  })}
              </Carousel>
            </div>

            <div className='col-12 col-lg-5 mt-5'>
              <h3>{product.name}</h3>
              <p id='product_id'>Product # {product._id}</p>

              <hr />

              <div className='rating-outer'>
                <div className='rating-inner' />
              </div>
              <span id='no_of_reviews'>({product.numOfReviews} Reviews)</span>

              <hr />

              <p id='product_price'>Rp.{product.price}</p>
              <div className='stockCounter d-inline'>
                <span className='btn btn-danger minus'>-</span>

                <input type='number' className='form-control count d-inline' value='1' readOnly />

                <span className='btn btn-primary plus'>+</span>
              </div>
              <button type='button' id='cart_btn' className='btn btn-primary d-inline ml-4'>
                Add to Cart
              </button>

              <hr />

              <p>
                Status:{' '}
                <span id='stock_status' className={product.stock > 0 ? 'greenColor' : 'redColor'}>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </p>

              <hr />

              <h4 className='mt-2'>Description:</h4>
              <p>{product.description}</p>

              <hr />

              <p id='product_seller mb-3'>
                Sold by: <strong>{product.seller}</strong>
              </p>

              <button
                id='review_btn'
                type='button'
                className='btn btn-primary mt-4'
                data-toggle='modal'
                data-target='#ratingModal'>
                Submit Your Review
              </button>

              <div className='row mt-2 mb-5'>
                <div className='rating w-50'>
                  <div
                    className='modal fade'
                    id='ratingModal'
                    tabIndex='-1'
                    role='dialog'
                    aria-labelledby='ratingModalLabel'
                    aria-hidden='true'>
                    <div className='modal-dialog' role='document'>
                      <div className='modal-content'>
                        <div className='modal-header'>
                          <h5 className='modal-title' id='ratingModalLabel'>
                            Submit Review
                          </h5>
                          <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                            <span aria-hidden='true'>&times;</span>
                          </button>
                        </div>
                        <div className='modal-body'>
                          <ul className='stars'>
                            <li className='star'>
                              <i className='fa fa-star' />
                            </li>
                            <li className='star'>
                              <i className='fa fa-star' />
                            </li>
                            <li className='star'>
                              <i className='fa fa-star' />
                            </li>
                            <li className='star'>
                              <i className='fa fa-star' />
                            </li>
                            <li className='star'>
                              <i className='fa fa-star' />
                            </li>
                          </ul>

                          <textarea name='review' id='review' className='form-control mt-3' />

                          <button
                            type='button'
                            className='btn my-3 float-right review-btn px-4 text-white'
                            data-dismiss='modal'
                            aria-label='Close'>
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.any
    })
  })
}

export default ProductDetail
