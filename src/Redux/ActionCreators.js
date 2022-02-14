import * as actionType from "./ActionTypes";
import axios from "axios";

export const addIngredient = (igtype) => {
  return {
    type: actionType.ADD_INGREDIENT,
    payload: igtype,
  };
};

export const removeIngredient = (igtype) => {
  return {
    type: actionType.REMOVE_INGREDIENT,
    payload: igtype,
  };
};

export const orderIngredient = () => {
  return {
    type: actionType.ORDER_INGREDIENT,
  };
};

export const resetIngredient = () => {
  return {
    type: actionType.RESET_INGREDIENT,
  };
};

export const orderLoaded = (order) => {
  return {
    type: actionType.ORDER_LOADED,
    payload: order,
  };
};

export const loadingOrderfailed = () => {
  return {
    type: actionType.LOADING_ORDER_FAILED,
  };
};

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    const queryParams = '&orderBy="userId"&equalTo="' + userId + '"'; //firebase database rules to get orders list by userid
    axios
      .get(
        "https://burger-builder-51667-default-rtdb.firebaseio.com/order.json?auth=" +
          token +
          queryParams
      )
      .then((response) => dispatch(orderLoaded(response.data)))
      .catch((err) => dispatch(loadingOrderfailed()));
  };
};
