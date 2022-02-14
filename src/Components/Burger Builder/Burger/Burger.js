import React from "react";
import Ingredients from "../Ingredients/Ingredients";
import "../../../stylesheet/Burger.css";

const Burger = (props) => {
  let ingredientArr = props.ingredients
    .map((item) => {
      let amountArr = [...Array(item.amount).keys()];
      return amountArr.map((_) => {
        return <Ingredients type={item.type} key={Math.random()} />;
      });
    })
    .reduce((arr, element) => {
      return arr.concat(element);
    }, []);

  if (ingredientArr.length === 0) {
    ingredientArr = <strong>Please add some ingredients! </strong>;
  }
  return (
    <div className="Burger">
      <Ingredients type={"TopBun"} />
      {ingredientArr}
      <Ingredients type={"ButtomBun"} />
    </div>
  );
};

export default Burger;
