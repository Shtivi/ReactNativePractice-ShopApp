export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'

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

  dispatch({
    type: SIGNUP,
    token: responseData.idToken,
    userId: responseData.tokenId
  })
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

  dispatch({
    type: LOGIN,
    token: responseData.idToken,
    userId: responseData.tokenId
  })
}