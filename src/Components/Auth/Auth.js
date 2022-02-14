import React, { Component } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { auth } from "../../Redux/AuthActionCreators";
import { Alert } from "reactstrap";
import Spinner from "../../Spinner/Spinner";

const mapStateToProps = (state) => {
  return {
    errMsg: state.errMsg,
    authLoading: state.authLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (email, password, mode) => dispatch(auth(email, password, mode)),
  };
};

class Auth extends Component {
  state = {
    mode: "Sign Up",
  };

  switchHandle = () => {
    this.setState({
      mode: this.state.mode === "Sign Up" ? "Login" : "Sign Up",
    });
  };
  render() {
    let form = null;
    let error = null;
    if (this.props.errMsg !== null) {
      error = <Alert color="danger">{this.props.errMsg}</Alert>;
    }

    if (this.props.authLoading) {
      form = <Spinner />;
    } else {
      form = (
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => {
            this.props.auth(values.email, values.password, this.state.mode);
          }}
          validate={(values) => {
            const errors = {};

            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(values.email)
            ) {
              errors.email = "This email is not valid.";
            }

            if (!values.password) {
              errors.password = "Required";
            } else if (values.password.length < 8) {
              errors.password = "Password at least 8 characters.";
            }

            if (this.state.mode === "Sign Up") {
              if (!values.confirmPassword) {
                errors.confirmPassword = "Required";
              } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = "Password didn't match.";
              }
            }

            return errors;
          }}
        >
          {(props) => (
            <div
              style={{
                border: "1px solid red",
                borderRadius: "7px",
                padding: "20px",
              }}
            >
              <div className="d-grid gap-2">
                <button
                  className="btn btn-danger btn-lg"
                  onClick={this.switchHandle}
                >
                  Switch to{" "}
                  {this.state.mode === "Sign Up" ? "Login" : "Sign Up"}
                </button>
                <br />
              </div>
              <form onSubmit={props.handleSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={props.values.email}
                  onChange={props.handleChange}
                  className="form-control"
                />
                <span
                  style={{
                    color: "red",
                    margin: "2px",
                  }}
                >
                  {props.errors.email}
                </span>
                <br />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={props.values.password}
                  onChange={props.handleChange}
                  className="form-control"
                />
                <span
                  style={{
                    color: "red",
                    margin: "2px",
                  }}
                >
                  {props.errors.password}
                </span>
                <br />
                {this.state.mode === "Sign Up" ? (
                  <div>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={props.values.confirmPassword}
                      onChange={props.handleChange}
                      className="form-control"
                    />
                    <span
                      style={{
                        color: "red",
                        margin: "2px",
                      }}
                    >
                      {props.errors.confirmPassword}
                    </span>
                  </div>
                ) : null}
                <br />
                <button type="submit" className="btn btn-warning">
                  {this.state.mode === "Sign Up" ? "Sign Up" : "Login"}
                </button>
              </form>
            </div>
          )}
        </Formik>
      );
    }
    return (
      <div>
        {error}
        {form}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
