import Product from "../../models/product";

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
    data[productId].price
  ))

  dispatch({
    type: SET_PRODUCTS,
    payload: loadedProducts
  })
}

export const deleteProduct = productId => async dispatch => {
  await fetch(`https://react-native-practice-ac60f.firebaseio.com/products/${productId}/.json`, {
    method: 'DELETE'
  })

  return {
    type: DELETE_PRODUCT, 
    pid: productId
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async dispatch => {
    const response = await fetch('https://react-native-practice-ac60f.firebaseio.com/products.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price
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
        price
      }
    })
  };
};

export const updateProduct = (id, title, description, imageUrl) => async dispatch => {
  await fetch(`https://react-native-practice-ac60f.firebaseio.com/products/${id}/.json`, {
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

  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl,
    }
  };
};
