import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../../components/MetaData';
import Spinner from '../../components/Spinner/Spinner';

import { toastr } from 'react-redux-toastr';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOrderDetailsAction,
  clearErrors,
} from '../../redux/actions/orderDetailsActions';

const OrderDetails = ({ match }) => {
  const dispatch = useDispatch();
  const { error, loading, order } = useSelector((state) => state.orderDetails);

  const { orderItems, orderStatus, paymentInfo, shippingInfo, user } = order;

  const { id } = match.params;
  useEffect(() => {
    if (error) {
      toastr.error(error.message);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetailsAction(id));
  }, [dispatch, error, id]);

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

  const isPaid =
    paymentInfo && paymentInfo.status === 'succeeded' ? true : false;

  return (
    <>
      <MetaData title="Order Details" />
      <h1 className="mt-5 text-center">Order Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8 mt-5 order-details">
            <h1 className="my-5">Order # {order && order._id}</h1>

            <h4 className="mb-4">Shipping Info</h4>
            <p>
              <b>Name:</b> {user && user.name}
            </p>
            <p>
              <b>Phone:</b> {shippingInfo && shippingInfo.phoneNumber}
            </p>
            <p className="mb-4">
              <b>Address:</b>
              {shippingDetails}
            </p>

            <p>
              <b>Amount:</b> ${paymentInfo && paymentInfo.totalPrice}
            </p>

            <hr />

            <h4 className="my-4">Payment</h4>
            <p className={isPaid ? 'greenColor' : 'redColor'}>
              <b>{isPaid ? 'PAID' : 'NOT PAID'}</b>
            </p>

            <h4 className="my-4">Order Status:</h4>
            <p
              className={
                orderStatus && orderStatus.includes('Delivered')
                  ? 'greenColor'
                  : 'redColor'
              }
            >
              <b>{orderStatus && orderStatus}</b>
            </p>

            <h4 className="my-4">Order Items:</h4>

            <hr />
            <div className="cart-item my-1">
              {orderItems &&
                orderItems.map((item) => (
                  <div key={item.product} className="row my-5">
                    <div className="col-4 col-lg-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        height="45"
                        width="65"
                      />
                    </div>

                    <div className="col-5 col-lg-5">
                      <Link to={`/products/${item.product}`}>{item.name}</Link>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p>${item.price}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <p>{item.quantity} Piece(s)</p>
                    </div>
                  </div>
                ))}
            </div>
            <hr />
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
