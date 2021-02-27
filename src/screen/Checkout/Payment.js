import { useState, useEffect } from 'react';
import MetaData from '../../components/MetaData';

import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfoAction } from '../../redux/actions/cartActions';
import { toastr } from 'react-redux-toastr';
import CheckoutSteps from './CheckoutSteps';

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';

import * as API from '../../services/Api';

const options = {
  style: {
    base: {
      fontSize: '16px',
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

const Payment = ({ history }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  useEffect(() => {}, []);

  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.querySelector('#pay_btn').disable = true;

    try {
      const res = await API.processPayment(paymentData);

      const clientSecret = res.data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        document.querySelector('#pay_btn').disable = false;
        toastr.error(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          history.push('/success');
        } else {
          toastr.error('There is some issue for Payment Processing...');
        }
      }
    } catch (error) {
      document.querySelector('#pay_btn').disable = false;
      toastr.error(error.code);
    }
  };

  return (
    <>
      <MetaData title="Payment" />
      <CheckoutSteps shipping confirmOrder payment />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form onSubmit={handleSubmit} className="shadow-lg">
            <h1 className="mb-4 text-center">Card Info</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
                options={options}
              />
            </div>

            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              Pay {`- $${orderInfo && orderInfo.totalPrice}`}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
