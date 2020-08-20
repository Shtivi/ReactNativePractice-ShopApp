import Product from "../../models/product"
import * as Permissions from 'expo-permissions'
import * as Notifications from 'expo-notifications'

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => async dispatch => {
  const response = await fetch('https://react-native-practice-ac60f.firebaseio.com/products.json')
  if (!response.ok) {
    throw new Error('Something went wrong')
  }

  const data = await response.json()
  const loadedProducts = Object.keys(data).map(productId => new Product(
    productId,
    'u1',
    data[productId].title,
    data[productId].imageUrl,
    data[productId].description,
    data[productId].price,
    data[productId].ownerPushToken
  ))

  dispatch({
    type: SET_PRODUCTS,
    payload: loadedProducts
  })
}

export const deleteProduct = productId => async (dispatch, getState) => {
  const token = getState().auth.token
  await fetch(`https://react-native-practice-ac60f.firebaseio.com/products/${productId}/.json?auth=${token}`, {
    method: 'DELETE'
  })

  return {
    type: DELETE_PRODUCT,
    pid: productId
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {

    let pushToken = null
    const statusObj = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    if (statusObj.status === 'granted')
    {
      pushToken = (await Notifications.getExpoPushTokenAsync()).data
    }

    const token = getState().auth.token
    const response = await fetch('https://react-native-practice-ac60f.firebaseio.com/products.json?auth=' + token, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price,
        ownerPushToken: pushToken
      })
    })

    const data = await response.json()

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: data.name,
        title,
        description,
        imageUrl,
        price,
        pushToken
      }
    })
  };
};

export const updateProduct = (id, title, description, imageUrl) => async (dispatch, getState) => {
  const token = getState().auth.token
  await fetch(`https://react-native-practice-ac60f.firebaseio.com/products/${id}/.json?auth=${token}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      description,
      imageUrl
    })
  })

  dispatch({
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl,
    }
  });
};
