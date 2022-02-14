import Logo from "../../assets/logo.png";
import { Navbar, Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import "../../stylesheet/NavClass.css";
import "../../stylesheet/BurgerBuilder.css";
import { connect } from "react-redux";
import React from "react";

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

const NavClass = (props) => {
  let links = null;
  if (props.token === null) {
    links = (
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink to="/login" className="NavLink">
            Login
          </NavLink>
        </NavItem>
      </Nav>
    );
  } else {
    links = (
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink to="/orders" className="NavLink">
            Orders
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/" className="NavLink">
            Burger Builder
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/logout" className="NavLink">
            Logout
          </NavLink>
        </NavItem>
      </Nav>
    );
  }
  return (
    <div className="mb-3">
      <Navbar color="danger" dark expand="md" light>
        <NavLink to="/" className="Checkout">
          <img src={Logo} alt="Logo" width="50px" height="40px" />
        </NavLink>
        {links}
      </Navbar>
    </div>
  );
};

export default connect(mapStateToProps)(NavClass);
