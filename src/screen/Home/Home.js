import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import Slider from 'rc-slider';

import MetaData from '../../components/MetaData';
import CardProduct from '../../components/CardProduct/CardProduct';
import Spinner from '../../components/Spinner/Spinner';

import { useDispatch, useSelector } from 'react-redux';
import {
  getAllProducts,
  clearErrors,
} from '../../redux/actions/productsAction';
import { toastr } from 'react-redux-toastr';

import './Home.css';
import 'rc-slider/assets/index.css';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1000, 100000000]);
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);

  const categories = [
    'Electronics',
    'Cameras',
    'Laptops',
    'Accessories',
    'Headphones',
    'Food',
    'Books',
    'Clothes/Shoes',
    'Beauty/Health',
    'Sports',
    'Outdoor',
    'Home',
  ];

  const dispatch = useDispatch();
  const {
    loading,
    products,
    error,
    productsCount,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const { keyword } = match.params;

  useEffect(() => {
    if (error) {
      toastr.error('Fetching Products Error', error);
      dispatch(clearErrors());
    }

    dispatch(getAllProducts(keyword, currentPage, price, category, rating));
  }, [dispatch, error, keyword, currentPage, price, category, rating]);

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }

  return (
    <>
      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <MetaData title="List of All Products" />
          <div className="container container-fluid">
            <h1 id="products_heading">Latest Products</h1>
            <section id="products" className="container mt-5">
              <div className="row">
                {keyword ? (
                  <>
                    <div className="col-6 col-md-3 mt-5 mb-5">
                      <div className="px-5">
                        <Range
                          marks={{
                            1: `$1`,
                            10000: `$10000`,
                          }}
                          min={1}
                          max={10000}
                          defaultValue={[1, 10000]}
                          tipFormatter={(value) => `$${value}`}
                          tipProps={{
                            placement: 'top',
                            visible: true,
                          }}
                          value={price}
                          onChange={(price) => setPrice(price)}
                        />

                        <hr className="my-5" />

                        <div className="mt-5">
                          <h4 className="mb-3">Categories</h4>
                          <ul className="pl-0">
                            {categories.map((category) => (
                              <li
                                style={{ cursor: 'pointer', listStyle: 'none' }}
                                key={category}
                                onClick={(category) => setCategory(category)}
                              >
                                {category}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <hr className="my-3" />

                        <div className="mt-5">
                          <h4 className="mb-3">Ratings</h4>
                          <ul className="pl-0">
                            {[5, 4, 3, 2, 1].map((star) => (
                              <li
                                style={{ cursor: 'pointer', listStyle: 'none' }}
                                key={star}
                                onClick={() => setRating(star)}
                              >
                                <div className="rating-outer">
                                  <div
                                    className="rating-inner"
                                    style={{
                                      width: `${star * 20}%`,
                                    }}
                                  />
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="col-6 col-md-9">
                      <div className="row">
                        {products &&
                          products.map((product) => {
                            return (
                              <CardProduct
                                key={product._id}
                                product={product}
                                col={4}
                              />
                            );
                          })}
                      </div>
                    </div>
                  </>
                ) : (
                  products &&
                  products.map((product) => {
                    return (
                      <CardProduct
                        key={product._id}
                        product={product}
                        col={3}
                      />
                    );
                  })
                )}
              </div>
            </section>

            {resPerPage <= count && (
              <div className="d-flex justify-content-center mt-5">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resPerPage}
                  totalItemsCount={productsCount}
                  onChange={(pageNumber) => setCurrentPage(pageNumber)}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="First"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

Home.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      keyword: PropTypes.any,
    }),
  }),
};

export default Home;
