import React, { Component } from "react";
import Burger from "../Burger Builder/Burger/Burger";
import Control from "./Controls/Control";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import Summary from "./Summary/Summary";
import { Link } from "react-router-dom";
import "../../stylesheet/BurgerBuilder.css";
import { connect } from "react-redux";
import {
  addIngredient,
  removeIngredient,
  orderIngredient,
} from "../../Redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    isOrdered: state.isOrdered,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (igtype) => dispatch(addIngredient(igtype)),
    removeIngredient: (igtype) => dispatch(removeIngredient(igtype)),
    orderIngredient: () => dispatch(orderIngredient()),
  };
};

class BurgerBuilder extends Component {
  state = {
    modalOpen: false,
  };

  // updatePurchase = (ingredients) => {
  //   let sum = ingredients.reduce((sum, element) => {
  //     return sum + element.amount;
  //   }, 0);
  //   this.setState({ isOrdered: sum > 0 });
  // };

  addIngredientsHandle = (type) => {
    this.props.addIngredient(type);
    this.props.orderIngredient();
  };

  removeIngredientHandle = (type) => {
    this.props.removeIngredient(type);
    this.props.orderIngredient();
  };

  toggleOpen = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  // handleCheckout = () => {
  //   let navigate = useNavigate();
  //   navigate("/checkout");
  //   // return () => navigate(".../checkout", { replace: true });
  // };

  // getBack = () => {
  //   const navigate = useNavigate();
  //   return navigate.push("/checkout");
  // };

  render() {
    return (
      <div>
        <div className="d-flex flex-md-row flex-column">
          <Burger ingredients={this.props.ingredients} />
          <Control
            addIngredient={this.addIngredientsHandle}
            removeIngredient={this.removeIngredientHandle}
            price={this.props.totalPrice}
            toggleOpen={this.toggleOpen}
            isOrdered={this.props.isOrdered}
          />
        </div>
        <Modal isOpen={this.state.modalOpen}>
          <ModalHeader>
            <strong>Your Order Summary</strong>
          </ModalHeader>
          <ModalBody>
            <p>Total price: {this.props.totalPrice.toFixed(0)} BDT</p>
            <Summary ingredients={this.props.ingredients} />
          </ModalBody>
          <ModalFooter>
            <Link to="/checkout" className="Checkout">
              <Button color="danger">Continue to checkout</Button>
            </Link>
            {/* 
            <Button color="danger" onClick={this.getBack}>
              Continue to checkout
            </Button> */}

            <Button color="dark" onClick={this.toggleOpen}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
