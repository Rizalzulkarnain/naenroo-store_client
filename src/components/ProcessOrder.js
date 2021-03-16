import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import MetaData from './MetaData';
import Spinner from './Spinner/Spinner';
import Sidebar from '../screen/Admin/Sidebar';

import { toastr } from 'react-redux-toastr';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderDetailsAction } from '../redux/actions/orderDetailsActions';
import {
  updateOrderAction,
  clearErrors,
} from '../redux/actions/updateOrderActions';

const ProcessOrder = ({ match }) => {
  const [status, setStatus] = useState('');

  const dispatch = useDispatch();
  const { loading, order } = useSelector((state) => state.orderDetails);
  const { error, isUpdated } = useSelector((state) => state.updateOrder);

  const {
    shippingInfo,
    orderItems,
    orderStatus,
    totalPrice,
    paymentInfo,
    user,
  } = order;

  const { id } = match.params;
  useEffect(() => {
    dispatch(getOrderDetailsAction(id));

    if (error) {
      toastr.error('Error Update Status');
      dispatch(clearErrors());
    }

    if (isUpdated) {
      dispatch(getOrderDetailsAction(id));
    }
  }, [dispatch, isUpdated, error, id]);

  const updateOrderHandler = (id) => {
    const formData = new FormData();
    formData.set('status', status);

    dispatch(updateOrderAction(id, formData));
    if (isUpdated) {
      toastr.success('Product Status Updated', `${status}`);
    }
  };

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

  const isPaid =
    paymentInfo && paymentInfo.status === 'succeeded' ? true : false;

  return (
    <>
      <MetaData title={`Process Order #${order && order._id}`} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          {loading ? (
            <Spinner />
          ) : (
            <div className="row d-flex justify-content-around">
              <div className="col-12 col-lg-7 order-details">
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
                  <b>Amount:</b> ${totalPrice && totalPrice}
                </p>

                <hr />

                <h4 className="my-4">Payment</h4>
                <p className={isPaid ? 'greenColor' : 'redColor'}>
                  <b>{isPaid ? 'PAID' : 'NOT PAID'}</b>
                </p>

                <h4 className="my-4">Stripe ID</h4>
                <p>
                  <b>{paymentInfo && paymentInfo.id}</b>
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
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
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

              <div className="col-12 col-lg-3 mt-5">
                <h4 className="my-4">Status</h4>

                <div className="form-group">
                  <select
                    className="form-control"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>

                <button
                  className="btn btn-primary btn-block"
                  onClick={() => updateOrderHandler(order._id)}
                >
                  Update Status
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

ProcessOrder.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.any,
    }),
  }),
};

export default ProcessOrder;
