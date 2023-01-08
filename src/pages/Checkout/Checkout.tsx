import CartItem from 'components/checkout/CartItem';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppState } from 'redux/store';

const Checkout = ({ confirm }: any) => {
  const history = useHistory();
  const user = useSelector((state: AppState) => state.auth);
  console.log('user', user?.data);
  const handleCheckout = () => {
    if (!user?.data) {
      history.push('/login?redirect=confirm-checkout');
    } else {
      history.push('/confirm-checkout');
    }
  };
  const cart = useSelector((state: AppState) => state.cart);
  const cartTotal = cart.reduce((acc, crr) => acc + crr.price, 0);
  return (
    <div className=" my-3">
      <Container>
        <div className="wrapper bg-white rounded border p-5">
          {cart.map((item) => (
            <CartItem
              imageClass={confirm && 'd-none'}
              titleClass={confirm && 'small'}
              buttonClass={confirm && 'd-none'}
              key={item._id}
              item={item}
            />
          ))}
          <div className="mt-5 d-flex flex-column align-items-end border-top pt-5">
            <h2 className={'mb-4 ' + confirm && ' h5'}>
              Total : ৳ {cartTotal}
            </h2>
            {!confirm && (
              <button
                onClick={handleCheckout}
                className="btn btn-lg btn-primary"
              >
                Checkout
              </button>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Checkout;
