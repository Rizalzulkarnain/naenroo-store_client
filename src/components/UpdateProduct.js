import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import Sidebar from '../screen/Admin/Sidebar';
import MetaData from './MetaData';

import { toastr } from 'react-redux-toastr';
import { useSelector, useDispatch } from 'react-redux';
import { getDetailProduct } from '../redux/actions/productDetailAction';
import { getAdminProductsAction } from '../redux/actions/adminProductsAction';
import {
  updateAdminProductAction,
  clearErrors,
} from '../redux/actions/updateAdminProductAction';

const CreateProduct = ({ match, history }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState('');
  const [images, setImages] = useState([]);

  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

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
  const { loading, error: updateError, isUpdated } = useSelector(
    (state) => state.updateAdminProduct
  );
  const { error, product } = useSelector((state) => state.productDetail);

  const { id } = match.params;
  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getDetailProduct(id));
    } else {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setSeller(product.seller);
      setStock(product.stock);
      setOldImages(product.images);
    }

    if (isUpdated) {
      dispatch(getAdminProductsAction());
    }
  }, [product, dispatch, isUpdated, id]);

  useEffect(() => {
    if (error) {
      toastr.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toastr.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, updateError, isUpdated, error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name', name);
    formData.set('price', price);
    formData.set('description', description);
    formData.set('category', category);
    formData.set('stock', stock);
    formData.set('seller', seller);
    formData.set('images', images);

    images.forEach((image) => {
      formData.append('images', image);
    });

    dispatch(updateAdminProductAction(id, formData));
    if (isUpdated) {
      toastr.success('Product Updated', `${name}`);
    }

    setName('');
    setPrice(0);
    setDescription('');
    setCategory('');
    setStock(0);
    setSeller('');
    setImages([]);
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <MetaData title="Update Product" />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <div className="wrapper my-5">
            <form
              onSubmit={handleSubmit}
              className="shadow-lg"
              encType="multipart/form-data"
            >
              <h1 className="mb-4 text-center">Update Product</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="price_field">Price</label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea
                  className="form-control"
                  id="description_field"
                  rows="8"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Category</label>
                <select
                  className="form-control"
                  id="category_field"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="stock_field">Stock</label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="seller_field">Seller Name</label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  value={seller}
                  onChange={(e) => setSeller(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Images</label>

                <div className="custom-file">
                  <input
                    type="file"
                    name="product_images"
                    className="custom-file-input"
                    id="customFile"
                    onChange={onChange}
                    multiple
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Images
                  </label>
                </div>
              </div>

              {oldImages &&
                oldImages.map((image) => (
                  <img
                    className="mt-3 mr-2"
                    key={image.public_id}
                    src={image.url}
                    alt={image.url}
                    style={{ width: '55px', height: '52px' }}
                  />
                ))}

              {imagesPreview.map((image, index) => (
                <img
                  className="mt-3 mr-2"
                  key={index}
                  src={image}
                  alt="imagePreview"
                  style={{ width: '55px', height: '52px' }}
                />
              ))}

              <button
                id="login_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={loading ? true : false}
              >
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

CreateProduct.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.any,
    }),
  }),
};

export default CreateProduct;
