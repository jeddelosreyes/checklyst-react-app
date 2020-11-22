import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  NavbarText,
  Button,
} from "reactstrap";

// pages
import GuestHome from "./pages/GuestHome";
import Home from "./pages/Home";
import VerifyAccount from "./pages/VerifyAccount";
import ResetPassword from "./pages/ResetPassword";

import AuthService from "./services/auth.service";

const App = () => {
  const currentUser = AuthService.getCurrentUser();
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);
  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <Navbar color='faded' light>
        <NavbarBrand href='/'>CheckLyst</NavbarBrand>
        {currentUser && (
          <div>
            {/* <NavbarToggler onClick={toggleNavbar} className='mr-2' /> */}
            <NavbarText>
              <Button color='secondary' onClick={toggleNavbar}>
                {currentUser.firstName + " " + currentUser.lastName}
              </Button>
            </NavbarText>
            <Collapse isOpen={!collapsed} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink href='/home'>Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href='/home' onClick={logOut}>
                    LogOut
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        )}
      </Navbar>
      <Container fluid={true}>
        <Switch>
          <Route
            exact
            path={["/", "/home"]}
            component={currentUser ? Home : GuestHome}
          />
          <Route path='/:email/verify' component={VerifyAccount} />
          <Route path='/reset-password' component={ResetPassword} />
        </Switch>
      </Container>
    </div>
  );
};

export default App;
