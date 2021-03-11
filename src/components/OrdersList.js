import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

import Sidebar from '../screen/Admin/Sidebar';
import MetaData from './MetaData';
import Spinner from './Spinner/Spinner';

import { toastr } from 'react-redux-toastr';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllOrdersAdminAction,
  clearErrors,
} from '../redux/actions/ordersAdminActions';

const OrdersList = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.allOrders);

  useEffect(() => {
    dispatch(getAllOrdersAdminAction());

    if (error) {
      toastr.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: 'Order ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'No of Items',
          field: 'numOfItems',
          sort: 'asc',
        },
        {
          label: 'Amount',
          field: 'amount',
          sort: 'asc',
        },
        {
          label: 'Status',
          field: 'status',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.paymentInfo.totalPrice}`,
        stock: order.stock,
        status:
          order.paymentInfo.orderedStatus &&
          String(order.paymentInfo.orderedStatus).includes('Delivered') ? (
            <p style={{ color: 'green' }}>{order.paymentInfo.orderedStatus}</p>
          ) : (
            <p style={{ color: 'red' }}>{order.paymentInfo.orderedStatus}</p>
          ),
        actions: (
          <>
            <Link
              to={`/admin/orders/${order._id}`}
              className="btn btn-primary py-1"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <button className="btn btn-danger py-1 px-2 ml-2">
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

    return data;
  };

  return (
    <>
      <MetaData title="All Products" />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <h1 className="my-5">All Orders</h1>
          {loading ? (
            <Spinner />
          ) : (
            <MDBDataTable
              data={setOrders()}
              className="px-3"
              bordered
              striped
              hover
            />
          )}
        </div>
      </div>
    </>
  );
};

OrdersList.propTypes = {
  history: PropTypes.any,
};

export default OrdersList;
