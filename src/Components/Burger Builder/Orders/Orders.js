import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../../../Redux/ActionCreators";
import Order from "./Order/Order";
import Spinner from "../../../Spinner/Spinner";

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
    orderLoading: state.orderLoading,
    orderError: state.orderError,
    token: state.token,
    userId: state.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
  };
};

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.token, this.props.userId);
  }
  render() {
    let orders = null;
    if (this.props.orderError) {
      orders = (
        <p
          style={{
            border: "1px solid grey",
            padding: "10px",
            borderRadius: "5px",
            margin: "20px",
            boxShadow: "1px 1px grey",
            textAlign: "left",
          }}
        >
          Sorry, failed to load orders!
        </p>
      );
    } else {
      if (this.props.orders.length === 0) {
        orders = (
          <p
            style={{
              border: "1px solid grey",
              padding: "10px",
              borderRadius: "5px",
              margin: "20px",
              boxShadow: "1px 1px grey",
              textAlign: "left",
            }}
          >
            There is no orders left!
          </p>
        );
      } else {
        orders = this.props.orders.map((order) => {
          return (
            <Order
              id={order.id}
              customer={order.customer}
              ingredients={order.ingredients}
              orderTime={order.orderTime}
              price={order.price}
              key={Math.random()}
            />
          );
        });
      }
    }
    return <div>{this.props.orderLoading ? <Spinner /> : orders}</div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
