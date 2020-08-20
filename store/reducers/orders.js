import { ADD_ORDER, SET_ORDERS } from '../actions/orders';
import Order from '../../models/order';

const initialState = {
  orders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.payload
      }
    case ADD_ORDER:
      return {
        ...state,
        orders: state.orders.concat(action.payload)
      };
  }

  return state;
};
