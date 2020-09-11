/*
  This file contains the generator functions for the saga middleware relating
  to authentication. References are placed into an array and exported to the
  root saga.
*/

//import ReactGA from 'react-ga';
import { takeEvery, put, call, select } from 'redux-saga/effects'
import actions from '../actions/index'
import {
  API_GET_USER_URI,
  LOGOUT_URI,
  AUTH_STATES,
  endpoint,
  isHTTPSuccess,
  PASSWORD_UPDATE_URI,
  GET_PASSWORD_RESET_TOKEN_URI,
  LOGIN_API_URI,
  REGISTER_API_URI,
  isHTTPUnauthorised
} from '../constants'
import {
  GET_CURRENT_USER,
  LOG_USER_OUT,
  //OAUTH_FACEBOOK,
  //OAUTH_GOOGLE,
  UPDATE_USER_PASSWORD,
  GET_PASSWORD_RESET_TOKEN,
  LOGIN,
  REGISTER
} from '../actions/actionTypes'
import Axios from 'axios';

const getShareCode = (state) => state.sharing.shareCode

function* handleLogin(params) {
  yield takeEvery(LOGIN, function*(action) {
    yield put(actions.storeRegistrationDetails(
      action.payload.settings
    ))
    yield put(actions.updateAuthState(AUTH_STATES.WAITING))
    const response = yield call(() => Axios({
      method: 'POST',
      url: endpoint(LOGIN_API_URI),
      withCredentials: true,
      validateStatus: () => true,
      data: {
        settings: action.payload.settings
      }
    }))
    if(isHTTPSuccess(response)) {
      if(response.data === 'register') {
        yield put(actions.updateAuthState(AUTH_STATES.REGISTRATION))
      } else {
        yield put(actions.storeRegistrationDetails(null))
        const shareCode = yield select(getShareCode)
        if(shareCode) {
          yield put(actions.handleShareCode(shareCode))
        }
        yield put(actions.updateCurrentUser(response.data.user))
      }
    }
    if(isHTTPUnauthorised(response)) {
      yield put(actions.updateAuthState(AUTH_STATES.FAILED))
    }
  })
}

function* handleRegister(params) {
  yield takeEvery(REGISTER, function*(action) {
    yield put(actions.storeRegistrationDetails(
      action.payload.settings
    ))
    yield put(actions.updateAuthState(AUTH_STATES.WAITING))
    const response = yield call(() => Axios({
      method: 'POST',
      url: endpoint(REGISTER_API_URI),
      withCredentials: true,
      validateStatus: () => true,
      data: {
        settings: action.payload.settings
      }
    }))
    if(isHTTPSuccess(response)) {
      yield put(actions.storeRegistrationDetails(null))
      const shareCode = yield select(getShareCode)
      if(shareCode) {
        yield put(actions.handleShareCode(shareCode))
      }
      yield put(actions.updateCurrentUser(response.data.user))
    }
    if(isHTTPUnauthorised(response)) {
      yield put(actions.updateAuthState(AUTH_STATES.FAILED))
    }
  })
}

function* handleGetUser(params) {
  yield takeEvery(GET_CURRENT_USER, function*(action) {
    const response = yield call(() => Axios({
        method: 'GET',
        url: endpoint(API_GET_USER_URI),
        withCredentials: true,
        validateStatus: () => true
    }))
    if(isHTTPSuccess) {
      yield put(actions.updateAuthState(AUTH_STATES.START))
      yield put(actions.updateCurrentUser(response.data.user))
    }
  })
}

/*
function* oauthFacebook(params) {
  yield takeEvery(OAUTH_FACEBOOK, function*(action) {
    const response = yield call(() => Axios({
      url: endpoint(OAUTH_FACEBOOK_URI),
      method: 'POST',
      data: {
        access_token: action.payload.access_token
      },
      validateStatus: () => true
    }))
    let {user, newUser} = response.data
    yield put(actions.updateCurrentUser(user, newUser))
    yield postAuthRoutine(user)
  })
}

function* oauthGoogle(params) {
  yield takeEvery(OAUTH_GOOGLE, function*(action) {
    const response = yield call(() => Axios({
      url: endpoint(OAUTH_GOOGLE_URI),
      method: 'POST',
      data: {
        access_token: action.payload.access_token
      },
      validateStatus: () => true
    }))
    let {user, newUser} = response.data
    yield put(actions.updateCurrentUser(user, newUser))
    yield postAuthRoutine(user) 
  })
}
*/

function* logout(params) {
  yield takeEvery(LOG_USER_OUT, function*(action) {
    try {
      yield call(() => Axios({
        method: 'GET',
        url: endpoint(LOGOUT_URI),
        withCredentials: true,
        validateStatus: () => true
      }))
    } catch(err) {
      console.log(err.message)
    } finally {
      document.cookie = 'tsf_jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      yield put(actions.storeLogout())
    } 
  })
}

function* updateUserPassword(params) {
  yield takeEvery(UPDATE_USER_PASSWORD, function*(action) {
    const response = yield call(() => Axios({
      method: 'POST',
      url: endpoint(PASSWORD_UPDATE_URI),
      data: {
        token: action.payload.token,
        password: action.payload.password
      },
      validateStatus: () => true
    }))
    if(isHTTPSuccess(response)) {
      yield put(actions.updateCurrentUser(response.data.user))
    } else if(response.data === 'invalid token') {
      yield put(actions.updateAuthState(AUTH_STATES.INVALID_TOKEN))
    }
  })
}

function* getPasswordResetToken(params) {
  yield takeEvery(GET_PASSWORD_RESET_TOKEN, function* (action) {
    const response = yield call(() => Axios({
      method: 'POST',
      url: endpoint(GET_PASSWORD_RESET_TOKEN_URI),
      data: {
        email: action.payload.email
      },
      validateStatus: () => true
    }))
    if(isHTTPSuccess(response)) {
      yield put(actions.updateAuthState(AUTH_STATES.RESET_SENT))
    }
  })
}

const authenticationSagas = [
  logout(),
  handleGetUser(),
  //oauthFacebook(),
  //oauthGoogle(),
  updateUserPassword(),
  getPasswordResetToken(),
  handleLogin(),
  handleRegister()
]

export default authenticationSagas
