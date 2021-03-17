import { useEffect, useState } from 'react';
import { MDBDataTable } from 'mdbreact';

import Sidebar from '../screen/Admin/Sidebar';
import MetaData from './MetaData';

import { useSelector, useDispatch } from 'react-redux';
import { getReviewsAction } from '../redux/actions/getReviewsActions';
import { deleteReviewAction } from '../redux/actions/deleteReviewActions';

const ProductReviews = () => {
  const [productId, setProductId] = useState('');

  const dispatch = useDispatch();

  const { reviews } = useSelector((state) => state.reviews);

  useEffect(() => {
    if (productId !== '') {
      dispatch(getReviewsAction(productId));
    }
  }, [dispatch, productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getReviewsAction(productId));

    setProductId('');
  };

  const deleteProductReviewsHandler = (id) => {
    dispatch(deleteReviewAction(id, productId));
  };

  const setReviews = () => {
    const data = {
      columns: [
        {
          label: ' Review ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Rating',
          field: 'rating',
          sort: 'asc',
        },
        {
          label: 'Comment',
          field: 'comment',
          sort: 'asc',
        },
        {
          label: 'User',
          field: 'user',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    };

    reviews.forEach((review) => {
      data.rows.push({
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        user: review.name,
        actions: (
          <>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteProductReviewsHandler(review._id)}
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
      <MetaData title="Product Reviews" />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <div className="row justify-content-center mt-5">
            <div className="col-5">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="productId_field">Enter Product ID</label>
                  <input
                    type="text"
                    id="email_field"
                    className="form-control"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                  />
                </div>

                <button
                  id="search_button"
                  type="submit"
                  className="btn btn-primary btn-block py-2"
                >
                  SEARCH
                </button>
              </form>
            </div>
          </div>

          {reviews && reviews.length > 0 ? (
            <MDBDataTable
              data={setReviews()}
              className="px-3"
              bordered
              striped
              hover
            />
          ) : (
            <p className="mt-5 text-center">No Reviews.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductReviews;
