import { useEffect, useState } from 'react';

import Sidebar from '../screen/Admin/Sidebar';
import MetaData from './MetaData';

import { toastr } from 'react-redux-toastr';
import { useSelector, useDispatch } from 'react-redux';
import { createAdminProductAction } from '../redux/actions/createAdminProductAction';
import {
  getAdminProductsAction,
  clearErrors,
} from '../redux/actions/adminProductsAction';

const CreateProduct = ({ history }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState('');
  const [images, setImages] = useState([]);
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
  const { loading, error } = useSelector((state) => state.createAdminProduct);

  useEffect(() => {
    dispatch(getAdminProductsAction());

    if (error) {
      toastr.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

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

    dispatch(createAdminProductAction(formData));
    toastr.success(
      'Your Product is Created !!!',
      `Product: "${name}" is created successfully, you can add product agan!.`
    );
    history.push('/dashboard');

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

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((imagesPreviewArray) => [
            ...imagesPreviewArray,
            reader.result,
          ]);
          setImages((imagesArray) => [...imagesArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <MetaData title="Create Product" />
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
              <h1 className="mb-4">New Product</h1>

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

              {imagesPreview.map((image) => (
                <img
                  className="mt-3 mr-2"
                  key={image}
                  src={image}
                  alt="imagePreview"
                  style={{ width: '55', height: '52' }}
                />
              ))}

              <button
                id="login_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={loading ? true : false}
              >
                CREATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;