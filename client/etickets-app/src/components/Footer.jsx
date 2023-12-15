import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <div className="main-footer bg-dark text-white mt-5 mb-0">
      <Container>
        <Row>
          <Col className="col-md-3 col-sm-6">
            {/* <h4>Lorem ipsum</h4>
            <ul className="list-unstyled">
              <li>lorem ipsum</li>
              <li>lorem ipsum</li>
              <li>lorem ipsum</li>
              <li>lorem ipsum</li>
            </ul> */}
          </Col>
          <Col className="col-md-3 col-sm-6">
            <h4>Events</h4>
            <ul className="list-unstyled">
              <li>Show Events</li>
              <li>Filter Events</li>
            </ul>
          </Col>
          <Col className="col-md-3 col-sm-6">
            <h4>Account</h4>
            <ul className="list-unstyled">
              <li>Tickets</li>
              <li>Load</li>
            </ul>
          </Col>
          <Col className="col-md-3 col-sm-6">
            {/* <h4>Lorem ipsum</h4>
            <ul className="list-unstyled">
              <li>lorem ipsum</li>
              <li>lorem ipsum</li>
              <li>lorem ipsum</li>
              <li>lorem ipsum</li>
            </ul> */}
          </Col>
        </Row>
        {/* Footer Bottom */}
        <div className="foot-bottom">
          <p className="text-xs-center mb-0">
            &copy;{new Date().getFullYear} eTickets.ph App - All Rights Reserved
          </p>
        </div>
      </Container>
    </div>
  );
}
export default Footer;
