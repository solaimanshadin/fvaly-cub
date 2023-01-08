import { Col, Row } from 'react-bootstrap';
import { FaRegTimesCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { removeFromCart } from 'redux/actionCreators/cartAction';
import { IProduct } from 'types';
import imageUrlParser from 'utils/imageUrlParser';
interface IProps {
  item: IProduct;
  imageClass?: string;
  titleClass?: string;
  buttonClass?: string;
  priceClass?: string;
}
const CartItem = ({
  item,
  imageClass,
  titleClass,
  buttonClass,
  priceClass,
}: IProps) => {
  const dispatch = useDispatch();
  return (
    <Row>
      <Col md={1} className={imageClass}>
        <img className={'img-fluid '} src={imageUrlParser(item.image)} alt="" />
      </Col>
      <Col>
        <h5 className={'mt-4 ' + titleClass}>{item.name}</h5>
      </Col>
      <Col
        md={3}
        className={'d-flex justify-content-between align-items-center '}
      >
        <button
          onClick={() => dispatch(removeFromCart(item._id as string))}
          className={'btn ' + buttonClass}
        >
          <FaRegTimesCircle />
        </button>
        <h6 className={'m-0 ' + priceClass}>৳ {item.price}</h6>
      </Col>
    </Row>
  );
};

export default CartItem;
