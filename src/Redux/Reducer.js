import * as actionType from "./ActionTypes";

const IngredientPrice = {
  Salad: 20,
  Onion: 20,
  Pickles: 40,
  Tomato: 20,
  Cheese: 40,
  Meat: 100,
};

const INITIAL_STATE = {
  ingredients: [
    { type: "Salad", amount: 0 },
    { type: "Onion", amount: 0 },
    { type: "Pickles", amount: 0 },
    { type: "Tomato", amount: 0 },
    { type: "Cheese", amount: 0 },
    { type: "Meat", amount: 0 },
  ],
  orders: [],
  orderLoading: true,
  orderError: false,
  totalPrice: 80,
  isOrdered: false,
  token: null,
  userId: null,
  errMsg: null,
  authLoading: false,
};

export const reducer = (state = INITIAL_STATE, action) => {
  const copyIngredients = [...state.ingredients];
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      for (let item of copyIngredients) {
        if (item.type === action.payload) {
          item.amount++;
        }
      }
      return {
        ...state,
        ingredients: copyIngredients,
        totalPrice: state.totalPrice + IngredientPrice[action.payload],
      };

    case actionType.REMOVE_INGREDIENT:
      for (let item of copyIngredients) {
        if (item.type === action.payload) {
          if (item.amount <= 0) return state;
          item.amount--;
        }
      }

      return {
        ...state,
        ingredients: copyIngredients,
        totalPrice: state.totalPrice - IngredientPrice[action.payload],
      };

    // case actionType.ORDER_INGREDIENT:
    //   const sum = state.ingredients.reduce((sum, element) => {
    //     return sum + element.amount;
    //   }, 0);
    //   return {
    //     ...state,
    //     isOrdered: sum > 0,
    //   };

    case actionType.ORDER_INGREDIENT:
      return {
        ...state,
        isOrdered: state.totalPrice > 80,
      };
    case actionType.RESET_INGREDIENT:
      return {
        ...state,
        ingredients: [
          { type: "Salad", amount: 0 },
          { type: "Onion", amount: 0 },
          { type: "Pickles", amount: 0 },
          { type: "Tomato", amount: 0 },
          { type: "Cheese", amount: 0 },
          { type: "Meat", amount: 0 },
        ],
        totalPrice: 80,
        isOrdered: false,
      };
    case actionType.ORDER_LOADED:
      let copyOrders = [];
      for (let key in action.payload) {
        copyOrders.push({
          ...action.payload[key],
          id: key,
        });
      }
      return {
        ...state,
        orders: copyOrders,
        orderLoading: false,
      };
    case actionType.LOADING_ORDER_FAILED:
      return {
        ...state,
        orderError: true,
        orderLoading: false,
      };
    case actionType.AUTH_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case actionType.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
        errMsg: null,
      };
    case actionType.AUTH_FAILED:
      return {
        ...state,
        errMsg: action.payload,
      };
    case actionType.AUTH_LOADING:
      return {
        ...state,
        authLoading: true,
      };
    default:
      return state;
  }
};
