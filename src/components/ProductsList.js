import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

import Sidebar from '../screen/Admin/Sidebar';
import MetaData from './MetaData';
import Spinner from './Spinner/Spinner';

import { toastr } from 'react-redux-toastr';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAdminProductsAction,
  clearErrors,
} from '../redux/actions/adminProductsAction';
import { deleteAdminProductAction } from '../redux/actions/deleteAdminProductAction';

const ProductsList = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector(
    (state) => state.adminProducts
  );

  const { isDeleted } = useSelector((state) => state.deleteAdminProduct);

  useEffect(() => {
    dispatch(getAdminProductsAction());

    if (error) {
      toastr.error(error.message);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      dispatch(getAdminProductsAction());
    }
  }, [dispatch, isDeleted, error]);

  const deleteProductHandler = (id) => {
    try {
      dispatch(deleteAdminProductAction(id));
      if (isDeleted) {
        history.push('/admin/products');
        toastr.success('Product Deleted', `Product was deleted successfully.`);
      }
    } catch (error) {
      toastr.error(error);
      dispatch(clearErrors());
    }
  };

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: 'ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Price',
          field: 'price',
          sort: 'asc',
        },
        {
          label: 'Stock',
          field: 'stock',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    };

    products.forEach((product) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `$${product.price}`,
        stock: product.stock,
        actions: (
          <>
            <Link
              to={`/admin/update/product/${product._id}`}
              className="btn btn-primary py-1"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              onClick={() => deleteProductHandler(product._id)}
              className="btn btn-danger py-1 px-2 ml-2"
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
      <MetaData title="All Products" />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <h1 className="my-5">All Products</h1>
          {loading ? (
            <Spinner />
          ) : (
            <MDBDataTable
              data={setProducts()}
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

ProductsList.propTypes = {
  history: PropTypes.any,
};

export default ProductsList;
