import { React } from "react";
import { Jumbotron, Row, Col } from "reactstrap";

// containers
import Login from "../containers/Login";
import Register from "../containers/Register";

const GuestHome = () => {
  return (
    <Row>
      <Col>
        <Jumbotron fluid>
          <h1 className='display-3'>Be a CheckLyst Contractor</h1>
          <p className='lead'>
            CheckLyst allows you to work at your own pace and your convenience.
          </p>
          <p className='lead'>
            Explore the many opportunities you gain while working as a CheckLyst
            Contractor.
          </p>
        </Jumbotron>
      </Col>
      <Col>
        <Login />
        <hr />
        <Register />
      </Col>
    </Row>
  );
};

export default GuestHome;
