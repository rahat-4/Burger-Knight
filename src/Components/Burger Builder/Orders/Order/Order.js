import React from "react";

const Order = (props) => {
  let orderIngredients = props.ingredients.map((ingred) => {
    return (
      <span
        key={ingred.type}
        style={{
          border: "1px solid #DC3545",
          padding: "2px",
          margin: "1px",
          boxShadow: "1px 1px grey",
        }}
      >
        {ingred.amount} x {ingred.type}
      </span>
    );
  });
  return (
    <div
      style={{
        border: "1px solid grey",
        padding: "50px",
        borderRadius: "5px",
        margin: "10px",
        boxShadow: "1px 1px grey",
        textAlign: "left",
      }}
    >
      <p>
        <strong>Order Number: </strong>
        {props.id}
      </p>
      <p>
        <strong>Phone Number: </strong>
        {props.customer.phone}
      </p>
      <p>
        <strong>Delivery Address: </strong>
        {props.customer.deliveryAddress}
      </p>
      <hr />
      {orderIngredients}
      <hr />
      <p>
        <strong>Payment Type: </strong>
        {props.customer.paymentType}
      </p>

      <p>
        <strong>Total: </strong>
        {props.price} BDT
      </p>
      <p>
        <strong>Order Time: </strong>
        {props.orderTime}
      </p>
    </div>
  );
};

export default Order;
