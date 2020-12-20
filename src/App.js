import React, { useState } from "react";
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
import VerifyAccount from "./containers/VerifyAccount";
import ResetPassword from "./containers/ResetPassword";
import {
  BsFillPersonFill,
  BsFillHouseFill,
  BsFillEnvelopeFill,
} from "react-icons/bs";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
      <Navbar className='header'>
        <NavbarBrand href='/' className='logo'>
          <img src='/images/Checklyst-Web Design_checklist_logo.svg' />
        </NavbarBrand>
        {currentUser && (
          <Nav>
            <NavItem>
              <BsFillHouseFill />
              <NavLink href='#'>Home</NavLink>
            </NavItem>
            <NavItem>
              <BsFillEnvelopeFill />
              <NavLink href='#'>Message</NavLink>
            </NavItem>
            <NavItem>
              <BsFillPersonFill />
              <NavLink href='/profile' className='active'>
                Profile
              </NavLink>
            </NavItem>
          </Nav>
        )}
      </Navbar>
      <div>
        <Router>
          <Switch>
            <Route path='/' component={currentUser ? Home : GuestHome} />
          </Switch>
        </Router>

        {/* <Route path='/:email/verify' component={VerifyAccount} />
        <Route path='/reset-password' component={ResetPassword} /> */}
      </div>
    </div>
  );
};

export default App;
