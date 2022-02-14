import Header from "./Header/Header";
import BurgerBuilder from "./Burger Builder/BurgerBuilder";
import Orders from "./Burger Builder/Orders/Orders";
import Checkout from "./Burger Builder/Checkout/Checkout";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./Auth/Auth";
import { connect } from "react-redux";
import { autoCheck } from "../Redux/AuthActionCreators";
import Logout from "./Auth/Logout";
import React, { Component } from "react";

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    autoCheck: () => dispatch(autoCheck()),
  };
};

class Main extends Component {
  componentDidMount() {
    this.props.autoCheck();
  }
  render() {
    let links = null;
    if (this.props.token === null) {
      links = (
        <Routes>
          <Route exact path="/login" element={<Auth />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      );
    } else {
      links = (
        <Routes>
          <Route path="*" element={<Navigate replace to="/" />} />
          <Route path="/" element={<Navigate replace to="/burger_builder" />} />
          <Route exact path="/burger_builder" element={<BurgerBuilder />} />
          <Route exact path="/orders" element={<Orders />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/logout" element={<Logout />} />
        </Routes>
      );
    }

    return (
      <div>
        <Header />
        <div className="container">{links}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
