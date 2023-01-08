import codImg from 'assets/images/cash-on-delivery.jpg';
import Checkout from 'pages/Checkout/Checkout';
import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearCart } from 'redux/actionCreators/cartAction';
import { AppState } from 'redux/store';
import requests from 'services/httpService';

function ConfirmCheckout() {
  const [fromData, setFormData] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const onChange = (e: any) =>
    setFormData({ ...fromData, [e.target.name]: e.target.value });
  const cart = useSelector((state: AppState) => state.cart);

  const placeOrder = async () => {
    try {
      await requests.post('/order', {
        shippingDetails: fromData,
        cart,
        products: cart.map((p) => p._id),
      });
      dispatch(clearCart());
      history.push('/order-confirmed');
    } catch (error) {}
  };

  return (
    <div className=" my-3">
      <Container>
        <div className="wrapper bg-white rounded border p-5">
          <div className="row">
            <div className="col-md-6">
              <Form>
                <h3>Shipping Details</h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    onChange={onChange}
                    name="shippingAddress"
                    as="textarea"
                    rows={3}
                    type="text"
                    placeholder="Your Shipping address"
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPhone">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    onChange={onChange}
                    name="contactNumber"
                    type="text"
                    placeholder="Your Contact Number"
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <div className="mb-3">
                  <p>Payment Method</p>

                  <input type="checkbox" checked />
                  <img className="ps-3" width="120px" src={codImg} alt="" />
                </div>

                <Button variant="primary" onClick={placeOrder} type="button">
                  Place Order
                </Button>
              </Form>
            </div>
            <div className="col-md-6">
              <Checkout confirm />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ConfirmCheckout;
