import { Card, CardHeader, CardBody, CardFooter, Button } from "reactstrap";
import React from "react";

const items = [
  { label: "Salad", type: "Salad" },
  { label: "Onion", type: "Onion" },
  { label: "Pickles", type: "Pickles" },
  { label: "Tomato", type: "Tomato" },
  { label: "Cheese", type: "Cheese" },
  { label: "Meat", type: "Meat" },
];

const ControlBody = (props) => {
  return (
    <div className="d-flex">
      <div className="me-auto m-2" style={{ fontWeight: "bold" }}>
        {props.label}
      </div>
      <Button
        className="btn btn-dark btn-sm m-1"
        onClick={() => props.removed(props.type)}
      >
        Less
      </Button>
      <Button
        className="btn btn-success btn-sm m-1"
        onClick={() => props.add(props.type)}
      >
        More
      </Button>
    </div>
  );
};

const Control = (props) => {
  return (
    <div className="ml-md-5" style={{ textAlign: "center" }}>
      <Card style={{ marginTop: "20px", marginBottom: "20px" }}>
        <CardHeader style={{ backgroundColor: "#DC3545", color: "white" }}>
          <h5>Add Ingredients</h5>
        </CardHeader>
        <CardBody>
          {items.map((val) => {
            return (
              <ControlBody
                label={val.label}
                type={val.type}
                key={Math.random()}
                add={props.addIngredient}
                removed={props.removeIngredient}
              />
            );
          })}
        </CardBody>
        <CardFooter>
          <h6>
            Price: <strong>{props.price}</strong>BDT
          </h6>
        </CardFooter>
        <Button
          disabled={!props.isOrdered}
          className="m-2"
          color="outline-danger"
          onClick={props.toggleOpen}
        >
          Order Now
        </Button>
        <br />
      </Card>
    </div>
  );
};

export default Control;
