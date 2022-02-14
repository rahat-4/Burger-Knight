import React, { Component } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";
import "../../../stylesheet/BurgerBuilder.css";
import { connect } from "react-redux";
import axios from "axios";
import { resetIngredient } from "../../../Redux/ActionCreators";
import Spinner from "../../../Spinner/Spinner";

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    isOrdered: state.isOrdered,
    userId: state.userId,
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetIngredients: () => dispatch(resetIngredient()),
  };
};

class Checkout extends Component {
  state = {
    values: {
      deliveryAddress: "",
      phone: "",
      paymentType: "",
    },
    modalOpen: false,
    modalMsg: "",
    isLoading: false,
  };

  inputChangeHandle = (e) => {
    this.setState({
      values: {
        ...this.state.values,
        [e.target.name]: e.target.value,
      },
    });
  };

  submitHandle = () => {
    this.setState({ isLoading: true });
    const order = {
      ingredients: this.props.ingredients,
      customer: this.state.values,
      price: this.props.totalPrice,
      orderTime: new Date(),
      userId: this.props.userId,
    };
    axios
      .post(
        "https://burger-builder-51667-default-rtdb.firebaseio.com/order.json?auth=" +
          this.props.token,
        order
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            modalOpen: true,
            modalMsg: "Order placed successfully!",
            resetIngred: true,
            isLoading: false,
          });
          this.props.resetIngredients();
        } else {
          this.setState({
            modalOpen: true,
            modalMsg: "Someting went wrong! Please order again",
            resetIngred: false,
            isLoading: false,
          });
        }
      })
      .catch((err) => {
        this.setState({
          modalOpen: true,
          modalMsg: err.message,
          resetIngred: false,
          isLoading: false,
        });
      });
  };

  render() {
    let form = (
      <div>
        <h4
          style={{
            border: "1px solid #DC3545",
            marginTop: "20px",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "pink",
            textAlign: "left",
          }}
        >
          Payment: {this.props.totalPrice} BDT
        </h4>
        <form
          style={{
            border: "1px solid #DC3545",
            padding: "50px",
            borderRadius: "10px",
            backgroundColor: "pink",
          }}
        >
          <br />
          <textarea
            name="deliveryAddress"
            value={this.state.values.deliveryAddress}
            className="form-control"
            placeholder="Delivery Address"
            onChange={this.inputChangeHandle}
          />
          <br />
          <input
            name="phone"
            value={this.state.values.phone}
            className="form-control"
            placeholder="Phone Number"
            onChange={this.inputChangeHandle}
          />
          <br />
          <select
            name="paymentType"
            value={this.state.values.paymentType}
            className="form-control"
            onChange={this.inputChangeHandle}
          >
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="Bkash">BKash</option>
            <option value="Rocket">Rocket</option>
            <option value="Nagad">Nagad</option>
          </select>
          <br />
          <Button
            color="danger"
            className="m-1"
            onClick={this.submitHandle}
            disabled={!this.props.isOrdered}
            block
          >
            Order Now
          </Button>
          <Link to="/" className="Checkout">
            <Button color="dark" className="m-1" block>
              Cancel
            </Button>
          </Link>
        </form>
      </div>
    );
    return (
      <div className="container">
        {this.state.isLoading ? <Spinner /> : form}

        <Modal isOpen={this.state.modalOpen}>
          <Link to="/" className="Checkout">
            <ModalBody>
              <p>{this.state.modalMsg}</p>
            </ModalBody>
          </Link>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
