import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import CartItem from 'components/checkout/CartItem';
import Loader from 'components/Loader';
import useAsync from 'hooks/useAsync';
import { useCallback, useEffect, useState } from 'react';
import { Badge, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import OrderService from 'services/OrderService';
import { getStatusColor } from './OrderList';

const OrderDetails = () => {
  const { id } = useParams<any>();
  const getData = useCallback(() => OrderService.getOrderByID(id), [id]);
  const { data, isLoading, isSuccess, isError, error } = useAsync(getData);
  const [Order, setOrder] = useState(data);
  useEffect(() => setOrder(data), [id, data?._id]);
  const cart = data?.cart || [];
  const cartTotal = cart.reduce((acc: any, crr: any) => acc + crr?.price, 0);
  const handleStatusUpdate = async (to: string) => {
    await OrderService.updateOrder(id, { status: to });
    const updatedOrder = await OrderService.getOrderByID(id);
    setOrder(updatedOrder);
    toast.success(`Order status updated to : ` + to);
  };
  return (
    <div>
      <CCard>
        <CCardHeader className="d-flex justify-content-between">
          Order Details
        </CCardHeader>
        <CCardBody>
          <>
            {isLoading && <Loader />}
            {isSuccess && (
              <div>
                <div className="text-center">
                  <h4>
                    Order ID: #{Order?.orderId}{' '}
                    <Badge bg={getStatusColor(Order?.status)}>
                      {Order?.status}
                    </Badge>
                  </h4>
                  <p>Ordered At: {Order?.createdAt}</p>
                </div>
                <div>
                  <h5>Ordered By</h5>
                  <div className="row">
                    <p className="col-6">
                      Name: <Link to="/"> {Order?.userId?.name}</Link>
                    </p>
                    <p className="col-6">
                      Email: <Link to="/"> {Order?.userId?.email}</Link>
                    </p>
                  </div>
                </div>
                <div>
                  <p>
                    Payment Method: <strong>Cash on Delivary</strong>
                  </p>
                </div>
                <div className="my-3">
                  <h5>Shipping details</h5>

                  <div className="row">
                    <p className="col-6">
                      Address: {Order?.shippingDetails.shippingAddress}
                    </p>
                    <p className="col-6">
                      Contact Number: {Order?.shippingDetails.contactNumber}
                    </p>
                  </div>
                </div>
                <div className="wrapper bg-white rounded border p-5">
                  {cart.map((item: any) => (
                    <CartItem buttonClass="d-none" key={item._id} item={item} />
                  ))}
                  <div className="mt-5 d-flex flex-column align-items-end border-top pt-5">
                    <h2 className={'mb-4 ' + confirm && ' h5'}>
                      Total : ৳ {cartTotal}
                    </h2>
                  </div>
                </div>
                <div className="text-center border rounded my-5 py-5">
                  <h5>Update status</h5>
                  <div className="flex gap-3 text-white">
                    {Order?.status !== 'processing' && (
                      <Button
                        onClick={() => handleStatusUpdate('processing')}
                        variant="info"
                      >
                        Processing
                      </Button>
                    )}
                    {Order?.status !== 'cancelled' && (
                      <Button
                        onClick={() => handleStatusUpdate('cancelled')}
                        className="mx-2"
                        variant="danger"
                      >
                        Cancel
                      </Button>
                    )}
                    {Order?.status !== 'delivered' && (
                      <Button
                        onClick={() => handleStatusUpdate('delivered')}
                        className="mx-2"
                        variant="warning"
                      >
                        Delivered
                      </Button>
                    )}
                    {Order?.status !== 'completed' && (
                      <Button
                        onClick={() => handleStatusUpdate('completed')}
                        className="mx-2"
                        variant="success"
                      >
                        Completed
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
            {isError && <h3>{error}</h3>}
          </>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default OrderDetails;
