import {
  USER_AUTHENTICATED,
  LOG_USER_OUT,
  STORE_LOGOUT,
  GET_CURRENT_USER,
  STORE_AUTH_STATE,
  //OAUTH_FACEBOOK,
  //OAUTH_GOOGLE,
  UPDATE_USER_PASSWORD,
  GET_PASSWORD_RESET_TOKEN,
  LOGIN,
  REGISTER,
  STORE_REGISTRATION_DETAILS
} from './actionTypes'

export const getCurrentUser = () => {
  return {
    type: GET_CURRENT_USER
  }
}

export const updateCurrentUser = (user) => {
  return {
    type: USER_AUTHENTICATED,
    payload: {
      user: user
    }
  }
}

export const logout = () => {
  return {
    type: LOG_USER_OUT
  }
}

export const storeLogout = () => {
  return {
    type: STORE_LOGOUT
  }
}

export const updateAuthState = (state) => {
  return {
    type: STORE_AUTH_STATE,
    payload: {
      state: state
    }
  }
}

/*
export const oauthFacebook = (token) => {
  return {
    type: OAUTH_FACEBOOK,
    payload: {
      access_token: token
    }
  }
}

export const oauthGoogle = (token) => {
  return {
    type: OAUTH_GOOGLE,
    payload: {
      access_token: token
    }
  }
}
*/

export const getPasswordResetToken = (email) => {
  return {
    type: GET_PASSWORD_RESET_TOKEN,
    payload: {
      email
    }
  }
}

export const updateUserPassword = (token, password) => {
  return {
    type: UPDATE_USER_PASSWORD,
    payload: {
      token,
      password
    }
  }
}

export const login = (settings) => {
  return {
    type: LOGIN,
    payload: {
      settings
    }
  } 
}

export const register = (settings) => {
  return {
    type: REGISTER,
    payload: {
      settings
    }
  } 
}

export const storeRegistrationDetails = (settings = null) => {
  return {
    type: STORE_REGISTRATION_DETAILS,
    payload: {
      settings
    }
  }
}
