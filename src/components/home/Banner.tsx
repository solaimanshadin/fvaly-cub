import banner1 from 'assets/images/banner1.png';
import banner2 from 'assets/images/banner2.png';
import { Carousel, Col, Container, ListGroup, Row } from 'react-bootstrap';
const Banner = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col lg={3}>
            <ListGroup>
              <ListGroup.Item>Winter collection</ListGroup.Item>
              <ListGroup.Item>Menz Cloths</ListGroup.Item>
              <ListGroup.Item>Womens Cloths</ListGroup.Item>
              <ListGroup.Item>Shoes</ListGroup.Item>
              <ListGroup.Item>Bikes</ListGroup.Item>
              <ListGroup.Item>Electorics</ListGroup.Item>
              <ListGroup.Item>Gadgets</ListGroup.Item>
              <ListGroup.Item>Household</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col lg={9} className="mt-4">
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={banner1}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={banner2}
                  alt="Second slide"
                />
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner;
