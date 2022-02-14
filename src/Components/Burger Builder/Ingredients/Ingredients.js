import "../../../stylesheet/Ingredients.css";
import TopBun from "../../../assets/images/top-bunn.png";
import Salad from "../../../assets/images/salad.png";
import Onion from "../../../assets/images/onion.png";
import Pickles from "../../../assets/images/pickles.png";
import Tomato from "../../../assets/images/tomato.png";
import Cheese from "../../../assets/images/cheese.png";
import Meat from "../../../assets/images/meat.png";
import ButtomBun from "../../../assets/images/buttom-bun.png";
import React from "react";

const Ingredients = (props) => {
  let ingredient = null;
  switch (props.type) {
    case "TopBun":
      ingredient = (
        <div>
          <img src={TopBun} alt="TopBun" />
        </div>
      );
      break;
    case "Salad":
      ingredient = (
        <div>
          <img
            src={Salad}
            alt="Salad"
            style={{ margin: "0px", padding: "0px" }}
          />
        </div>
      );
      break;
    case "Onion":
      ingredient = (
        <div>
          <img
            src={Onion}
            alt="Onion"
            style={{ margin: "0px", padding: "0px" }}
          />
        </div>
      );
      break;
    case "Pickles":
      ingredient = (
        <div>
          <img src={Pickles} alt="Pickles" />
        </div>
      );
      break;
    case "Tomato":
      ingredient = (
        <div>
          <img
            src={Tomato}
            alt="Tomato"
            style={{ margin: "0px", padding: "0px" }}
          />
        </div>
      );
      break;
    case "Cheese":
      ingredient = (
        <div>
          <img
            src={Cheese}
            alt="Cheese"
            style={{ margin: "0px", padding: "0px" }}
          />
        </div>
      );
      break;
    case "Meat":
      ingredient = (
        <div>
          <img
            src={Meat}
            alt="Meat"
            style={{ margin: "0px", padding: "0px" }}
          />
        </div>
      );
      break;
    case "ButtomBun":
      ingredient = (
        <div>
          <img
            src={ButtomBun}
            alt="ButtomBun"
            style={{ margin: "0px", padding: "0px" }}
          />
        </div>
      );
      break;
    default:
      ingredient = null;
  }
  return <div className="ingredient">{ingredient}</div>;
};

export default Ingredients;
