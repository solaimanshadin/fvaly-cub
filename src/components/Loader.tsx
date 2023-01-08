import { Spinner } from 'react-bootstrap';

type Props = {};

const Loader = (props: Props) => {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center w-full w-100">
      <Spinner animation="border" />
    </div>
  );
};

export default Loader;
