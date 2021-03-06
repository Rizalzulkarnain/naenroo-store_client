import { Link } from 'react-router-dom';
import MetaData from '../../components/MetaData';

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
  return (
    <>
      <MetaData title="Checkout Steps" />
      <div className="checkout-progress d-flex justify-content-center mt-5">
        {shipping ? (
          <Link to="/shipping/checkout" className="float-right">
            <div className="triangle2-active"></div>
            <div className="step active-step">Shipping</div>
            <div className="triangle-active"></div>
          </Link>
        ) : (
          <Link to="#!" disabled>
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">Shipping</div>
            <div className="triangle-incomplete"></div>
          </Link>
        )}

        {confirmOrder ? (
          <Link to="/order/checkout/confirm" className="float-right">
            <div className="triangle2-active"></div>
            <div className="step active-step">Confirm Order</div>
            <div className="triangle-active"></div>
          </Link>
        ) : (
          <Link to="#!" disabled>
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">Confirm Order</div>
            <div className="triangle-incomplete"></div>
          </Link>
        )}

        {payment ? (
          <Link to="/shipping/checkout" className="float-right">
            <div className="triangle2-active"></div>
            <div className="step active-step">Payment</div>
            <div className="triangle-active"></div>
          </Link>
        ) : (
          <Link to="#!" disabled>
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">Payment</div>
            <div className="triangle-incomplete"></div>
          </Link>
        )}
      </div>
    </>
  );
};

export default CheckoutSteps;
