import successImg from 'assets/images/success.png';
type Props = {};

const OrderSuccess = (props: Props) => {
  return (
    <div className="container ">
      <div className="wrapper bg-white rounded border p-5 text-center py-5 my-3">
        <img width="200px" src={successImg} alt="" />
        <h1>Thank you for your order</h1>
        <p>
          Your order has been placed. We will beign processing it right away.
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;
