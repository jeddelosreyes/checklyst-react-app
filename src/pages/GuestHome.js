import { React, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  Button,
  Grid,
  CardTitle,
} from "reactstrap";

import { NavLink, Route } from "react-router-dom";
// containers
import Login from "../containers/Login";
import Register from "../containers/Register";
import VerifyAccount from "../containers/VerifyAccount";
import ResetPassword from "../containers/ResetPassword";

const GuestHome = ({ match }) => {
  const [showLink, setShowLink] = useState(true);
  const [title, setTitle] = useState("");
  useEffect(() => {
    let endpoint = window.location.pathname;
    if (endpoint.includes("verify") || endpoint.includes("reset-password")) {
      if(endpoint.includes("verify")){
        setTitle("Verify Account")
      } else{
        setTitle("Reset Password")
      }
      setShowLink(false);
    } else {
      setShowLink(true);
    }
  });

  return (
    <div>
      <Container fluid={true}>
        <Row>
          <Col>
            {/* <img
              src='/images/Checklyst-Web Design_checklist_logo.svg'
              style={{ width: 150 }}
            /> */}
            <img src='/images/Checklyst-Web Design_homepage_artwork.svg' />
          </Col>
          <Col className='GuestRight'>
            <div>
              <h1>Be a CheckLyst Contractor</h1>
              <p>
                CheckLyst allows you to work at your own pace and your
                convenience.
              </p>
              <p>
                Explore the many opportunities you gain while working as a
                CheckLyst Contractor.
              </p>
            </div>
            <Card className='guest-div'>
              <CardBody>
                {showLink && (
                  <CardTitle tag='h5'>
                    <NavLink exact to={"/"}>Login</NavLink>
                    <NavLink to={"/register"} className='float-right'>
                      Sign Up
                    </NavLink>
                  </CardTitle>
                )}

                {!showLink && (
                  <CardTitle tag='h5'>
                    {title}
                  </CardTitle>
                )}

                <Route exact path={[`${match.path}`]} component={Login} />
                <Route path={`${match.path}register`} component={Register} />
                <Route
                  path={`${match.path}:email/verify`}
                  component={VerifyAccount}
                />
                <Route
                  path={`${match.path}reset-password`}
                  component={ResetPassword}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* <div className='guest-div'>
        {match.path}
        <Card>
          <CardBody>
            <CardTitle tag='h5'>
              {" "}
              <Link to={"/login"} className={isLogin ? "active" : ""}>
                Login
              </Link>{" "}
              <Link
                to={"/register"}
                onClick={showRegister}
                className={`float-right ${isLogin ? "" : "active"}`}
              >
                Sign Up
              </Link>
            </CardTitle>
            <Route path={`${match.path}login`} component={Login} />
            <Route path={`${match.path}register`} component={Register} />
            <Route path={`${match.path}:email/verify`} component={VerifyAccount} />
            <Route path={`${match.path}reset-password`} component={ResetPassword} />
          </CardBody>
        </Card>
      </div> */}
    </div>
  );
};

export default GuestHome;
