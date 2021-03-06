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
import { deleteOrderAction } from '../redux/actions/deleteOrderActions';

const OrdersList = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { isDeleted } = useSelector((state) => state.deleteOrder);

  useEffect(() => {
    dispatch(getAllOrdersAdminAction());

    if (error) {
      toastr.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      dispatch(getAllOrdersAdminAction);
    }
  }, [dispatch, isDeleted, error]);

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

    const handleDeleteOrder = (id) => {
      dispatch(deleteOrderAction(id));
      toastr.success('Order Deleted', `Order: ${id} Successfully delete...!`);
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        stock: order.stock,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes('Delivered') ? (
            <p style={{ color: 'green' }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: 'red' }}>{order.orderStatus}</p>
          ),
        actions: (
          <>
            <Link
              to={`/admin/order-detail/${order._id}`}
              className="btn btn-primary py-1"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => handleDeleteOrder(order._id)}
            >
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
      <MetaData title="All Orders" />
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
