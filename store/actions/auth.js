import { AsyncStorage } from "react-native"

export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'

export const signup = (email, password) => async dispatch => {
  const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvucPtChrmHxSFfua6aIq3vQeQb0YSsr8', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true
    })
  })
  const responseData = await response.json()

  if (!response.ok) {
    const errorId = responseData.error.message
    if (errorId === 'EMAIL_EXISTS') {
      throw new Error('email already exists')
    } else {
      throw new Error('Something went wrong')
    }
  }

  const { idToken, localId, expiresIn } = responseData
  await persistAuthData(idToken, localId, parseInt(expiresIn))
  dispatch(authenticate(idToken, localId))
}

export const login = (email, password) => async dispatch => {
  const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAvucPtChrmHxSFfua6aIq3vQeQb0YSsr8', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true
    })
  })
  const responseData = await response.json()

  if (!response.ok) {
    const errorId = responseData.error.message
    if (errorId === 'EMAIL_NOT_FOUND' || errorId == 'INVALID_PASSWORD') {
      throw new Error('Invalid credentials')
    } else {
      throw new Error('Something went wrong')
    }
  }

  const { idToken, localId, expiresIn } = responseData
  await persistAuthData(idToken, localId, parseInt(expiresIn))
  dispatch(authenticate(idToken, localId))
}

export const authenticate = (userId, token) => ({
  type: AUTHENTICATE,
  userId,
  token
})

export const logout = () => async dispatch => {
  await AsyncStorage.removeItem('userData')
  dispatch({ type: LOGOUT })
}

const persistAuthData = (token, userId, expiresIn) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token,
    userId,
    expiryDate: new Date(new Date().getTime() + expiresIn * 1000).toISOString()
  }))
}