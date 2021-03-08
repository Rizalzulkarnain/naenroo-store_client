import Http from './Http';

export const fetchProducts = (keyword, currentPage, price, rating = 0) => {
  return Http.get(
    `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`
  );
};

export const fetchProductsCategory = (
  keyword,
  currentPage,
  price,
  category
) => {
  return Http.get(
    `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`
  );
};

export const fetchDetailProduct = (id) => Http.get(`/api/v1/products/${id}`);

const config = {
  withCredentials: true,
  credentials: 'include',
};

export const loginUser = (email, password) =>
  Http.post(`/api/v1/auth/login`, { email, password }, config);

export const registerUser = (userData) =>
  Http.post(`/api/v1/auth/register`, userData, {
    config,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const loadUser = () => Http.get(`/api/v1/auth/profile`, config);

export const logoutUser = () => Http.get(`/api/v1/auth/logout`);

export const updateProfile = (user) => {
  return Http.put('/api/v1/auth/profile/update', user, config);
};

export const updatePassword = (password) => {
  return Http.put('/api/v1/auth/update', password, config);
};

export const forgotPassword = (email) => {
  return Http.post('/api/v1/auth/forgot', email, config);
};

export const newPassword = (token, passwords) => {
  return Http.put(`/auth/new-password/${token}`, passwords, config);
};

export const stripeApi = () => {
  return Http.get(`/api/v1/payment/api`, config);
};

export const processPayment = (paymentData) => {
  return Http.post(`/api/v1/payment/process`, paymentData, config);
};

export const createOrder = (order) => {
  return Http.post(`/api/v1/order/new`, order, config);
};

export const myOrders = () => {
  return Http.get(`/api/v1/orders/me`, config);
};

export const orderDetails = (id) => {
  return Http.get(`/api/v1/order/${id}`, config);
};

export const newReview = (reviewData) => {
  return Http.put(`/api/v1/review`, reviewData, config);
};

export const adminProducts = () => {
  return Http.get(`/api/v1/admin/products`, config);
};

export const createAdminProduct = (product) => {
  return Http.post(`/api/v1/admin/product`, product, {
    config,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
