import * as OrdersAPI from '../../services/OrdersAPI'

export const SET_ORDERS = 'SET_ORDERS'
export const ADD_ORDER = 'ADD_ORDER'

export const getOrders = () => async (dispatch, getState) => {
  const token = getState().auth.token
  const userId = getState().auth.userId

  const orders = await OrdersAPI.fetchUserOrders(userId)
  dispatch({
    type: SET_ORDERS,
    payload: orders
  })
}

export const addOrder = (cartItems, totalAmount) => async (dispatch, getState) => {
  const token = getState().auth.token
  const userId = getState().auth.userId

  const order = await OrdersAPI.addOrder(userId, token, new Date(), cartItems, totalAmount)
  dispatch({
    type: ADD_ORDER,
    payload: order
  });

  cartItems.forEach(item => {
    const pushToken = item.ownerPushToken
    console.log(item)

    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: pushToken,
        title: "You have a new order!",
        body: item.productTitle
      }),
    }).catch(console.log)
  })
};
