import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MetaData from '../../components/MetaData';

import { useSelector, useDispatch } from 'react-redux';
import {
  addToCartAction,
  removeItemFromCartAction,
} from '../../redux/actions/cartActions';

const Cart = ({ history }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQuantity = quantity + 1;
    if (newQuantity > stock) return;
    dispatch(addToCartAction(id, newQuantity));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQuantity = quantity - 1;
    if (newQuantity <= 0) return;
    dispatch(addToCartAction(id, newQuantity));
  };

  const removeItemFromCartHandler = (id) => {
    dispatch(removeItemFromCartAction(id));
  };

  const checkOutHandler = () => {
    history.push('/login?redirect=shipping/checkout');
  };

  return (
    <>
      <MetaData title="Your Cart" />
      {cartItems.length === 0 ? (
        <h2 className="mt-5 text-center">Your cart is empty</h2>
      ) : (
        <>
          <div className="container container-fluid">
            <h2 className="mt-5">
              Your Cart: <b>{cartItems.length} items</b>
            </h2>

            <div className="row d-flex justify-content-between">
              <div className="col-12 col-lg-8">
                {cartItems.map((item) => (
                  <div key={item.product}>
                    <hr />
                    <div className="cart-item">
                      <div className="row">
                        <div className="col-4 col-lg-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            height="90"
                            width="115"
                          />
                        </div>

                        <div className="col-5 col-lg-3">
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p id="card_item_price">$.{item.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <div className="stockCounter d-inline">
                            <span
                              className="btn btn-danger minus"
                              onClick={() =>
                                decreaseQuantity(item.product, item.quantity)
                              }
                            >
                              -
                            </span>
                            <input
                              type="number"
                              className="form-control count d-inline"
                              value={item.quantity}
                              readOnly
                            />

                            <span
                              className="btn btn-primary plus"
                              onClick={() =>
                                increaseQuantity(
                                  item.product,
                                  item.quantity,
                                  item.stock
                                )
                              }
                            >
                              +
                            </span>
                          </div>
                        </div>

                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                          <i
                            id="delete_cart_item"
                            className="fa fa-trash btn btn-danger"
                            onClick={() =>
                              removeItemFromCartHandler(item.product)
                            }
                          ></i>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>

              <div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                  <h4>Order Summary</h4>
                  <hr />
                  <p>
                    Subtotal:{' '}
                    <span className="order-summary-values">
                      {cartItems.reduce((acc, item) => {
                        return acc + Number(item.quantity);
                      }, 0)}{' '}
                      (Units)
                    </span>
                  </p>
                  <p>
                    Est. total:{' '}
                    <span className="order-summary-values">
                      $.
                      {cartItems
                        .reduce((acc, item) => {
                          return acc + item.quantity * item.price;
                        }, 0)
                        .toFixed(2)}
                    </span>
                  </p>

                  <hr />
                  <button
                    id="checkout_btn"
                    className="btn btn-primary btn-block"
                    onClick={checkOutHandler}
                  >
                    Check out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

Cart.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default Cart;
