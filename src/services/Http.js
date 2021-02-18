import axios from 'axios';
import store from '../redux/store';
import { logoutAction } from '../redux/actions/authActions';

const Http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    crossDomain: true,
  },
  timeout: 5000,
});

Http.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response.status !== 401) {
      throw error;
    }

    if (typeof error.response.data.error.name !== 'undefined') {
      if (error.response.data.error.name === 'TokenExpiredError') {
        store.dispatch(logoutAction());
        throw error;
      }
    }
  }
);

export default Http;
