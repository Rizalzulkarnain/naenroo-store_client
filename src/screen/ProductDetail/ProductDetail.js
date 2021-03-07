import { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import Reviews from '../../components/Reviews';
import { Carousel } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { getDetailProduct } from '../../redux/actions/productDetailAction';
import { addToCartAction } from '../../redux/actions/cartActions';
import { clearErrors } from '../../redux/actions/productsAction';
import { newReviewActions } from '../../redux/actions/newReviewActions';
import { toastr } from 'react-redux-toastr';

import MetaData from '../../components/MetaData';
import Spinner from '../../components/Spinner/Spinner';

const ProductDetail = ({ match }) => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetail
  );
  const { user } = useSelector((state) => state.auth);
  const { error: reviewError } = useSelector((state) => state.newReview);

  const { id } = match.params;
  useEffect(() => {
    if (error) {
      toastr.error('Error Fetching Product Detail', error.message);
      dispatch(clearErrors());
    }

    if (reviewError) {
      toastr.error(error.message);
      dispatch(clearErrors());
    }

    dispatch(getDetailProduct(id));
  }, [dispatch, error, reviewError, id]);

  const increaseQuantity = () => {
    if (quantity >= product.stock) return;
    setQuantity((prevIncrease) => prevIncrease + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    setQuantity((prevDecrease) => prevDecrease - 1);
  };

  const addToCartHandler = () => {
    dispatch(addToCartAction(id, quantity));
    toastr.success('Item Added', 'Item SuccessFully add to cart');
  };

  function setUserRatings() {
    const stars = document.querySelectorAll('.star');

    stars.forEach((star, index) => {
      star.starValue = index + 1;
      ['click', 'mouseover', 'mouseout'].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === 'click') {
          if (index < this.starValue) {
            star.classList.add('orange');

            setRating(this.starValue);
          } else {
            star.classList.remove('orange');
          }
        }

        if (e.type === 'mouseover') {
          if (index < this.starValue) {
            star.classList.add('yellow');
          } else {
            star.classList.remove('yellow');
          }
        }

        if (e.type === 'mouseout') {
          star.classList.remove('yellow');
        }
      });
    }
  }

  const reviewHandler = () => {
    const formData = new FormData();

    formData.set('rating', rating);
    formData.set('comment', comment);
    formData.set('productId', id);

    dispatch(newReviewActions(formData));
    toastr.success('Review posted', `Your review "${comment}" has been post`);
  };

  return (
    <div className="container container-fluid">
      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <MetaData title={`${product.name}`} />
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              <Carousel pause="hover">
                {product.images &&
                  product.images.map((image) => {
                    return (
                      <Carousel.Item key={image.public_id}>
                        <img
                          className="d-block w-100"
                          src={image.url}
                          alt={product.title}
                        />
                      </Carousel.Item>
                    );
                  })}
              </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{product.name}</h3>
              <p id="product_id">Product # {product._id}</p>

              <hr />

              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(product.ratings / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

              <hr />

              <p id="product_price">$.{product.price}</p>
              <div className="stockCounter d-inline">
                <span
                  className="btn btn-danger minus"
                  onClick={decreaseQuantity}
                >
                  -
                </span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value={quantity}
                  readOnly={true}
                />

                <span
                  className="btn btn-primary plus"
                  onClick={increaseQuantity}
                >
                  +
                </span>
              </div>
              <button
                type="button"
                id="cart_btn"
                className="btn btn-primary d-inline ml-4"
                disabled={product.stock === 0}
                onClick={addToCartHandler}
              >
                Add to Cart
              </button>

              <hr />

              <p>
                Status:{' '}
                <span
                  id="stock_status"
                  className={product.stock > 0 ? 'greenColor' : 'redColor'}
                >
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </p>

              <hr />

              <h4 className="mt-2">Description:</h4>
              <p>{product.description}</p>

              <hr />

              <p id="product_seller mb-3">
                Sold by: <strong>{product.seller}</strong>
              </p>

              {user ? (
                <button
                  id="review_btn"
                  type="button"
                  className="btn btn-primary mt-4"
                  data-toggle="modal"
                  data-target="#ratingModal"
                  onClick={setUserRatings}
                >
                  Submit Your Review
                </button>
              ) : (
                <div className="alert alert-danger mt-5">
                  Login to Post your review.
                </div>
              )}

              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Submit Review
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul className="stars">
                            <li className="star">
                              <i className="fa fa-star" />
                            </li>
                            <li className="star">
                              <i className="fa fa-star" />
                            </li>
                            <li className="star">
                              <i className="fa fa-star" />
                            </li>
                            <li className="star">
                              <i className="fa fa-star" />
                            </li>
                            <li className="star">
                              <i className="fa fa-star" />
                            </li>
                          </ul>

                          <textarea
                            name="review"
                            id="review"
                            className="form-control mt-3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />

                          <button
                            type="button"
                            className="btn my-3 float-right review-btn px-4 text-white"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={reviewHandler}
                          >
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
          {product.reviews && product.reviews.length > 0 && (
            <Reviews reviews={product.reviews} />
          )}
        </>
      )}
    </div>
  );
};

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.any,
    }),
  }),
};

export default memo(ProductDetail);
