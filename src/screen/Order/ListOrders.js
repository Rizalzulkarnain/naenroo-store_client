import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

import MetaData from '../../components/MetaData';
import Spinner from '../../components/Spinner/Spinner';

import { toastr } from 'react-redux-toastr';
import { useSelector, useDispatch } from 'react-redux';
import { myOrdersAction, clearErrors } from '../../redux/actions/ordersActions';

const ListOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrdersAction());

    if (error) {
      toastr.error(error.message);
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
          label: 'Num of Items',
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
        status:
          order.paymentInfo.orderedStatus &&
          String(order.paymentInfo.orderedStatus).includes('Delivered') ? (
            <p style={{ color: 'green' }}>{order.paymentInfo.orderedStatus}</p>
          ) : (
            <p style={{ color: 'red' }}>{order.paymentInfo.orderedStatus}</p>
          ),
        actions: (
          <Link to={`/order/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });

    return data;
  };

  return (
    <>
      <MetaData title="My Orders" />
      <h1 className="mt-5 text-center">My Orders</h1>

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
    </>
  );
};

export default ListOrders;
