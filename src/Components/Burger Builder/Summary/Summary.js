import React from "react";

const Summary = (props) => {
  const ingredients = props.ingredients.map((item) => {
    return (
      <li key={Math.random()}>
        {item.type} : {item.amount}
      </li>
    );
  });
  return <div>{ingredients}</div>;
};

export default Summary;
