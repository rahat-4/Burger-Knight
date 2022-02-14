import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../Redux/AuthActionCreators";
import { Navigate } from "react-router-dom";

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
  }
  render() {
    return <Navigate to="/login" />;
  }
}

export default connect(null, mapDispatchToProps)(Logout);
