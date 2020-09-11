/*
  This file contains the generator functions for the saga middleware relating
  to any action regarding sharing.
*/

import { takeEvery, put, call, select } from 'redux-saga/effects'
//import { push } from 'react-router-redux';
import actions from '../actions/index'
import {
  GET_SHARE_CODE_URI,
  RUN_SHARE_CODE_URI,
  JH_WORLD_SUMMARY_URL,
  GET_USER_CONTACTS_URI,
  GET_TOKEN_OWNER_URI,
  CONFIRM_CONNECTION_URI,
  isHTTPSuccess,
  endpoint,
  headers
} from '../constants'
import {
  HANDLE_SHARE_CODE,
  GET_USER_SHARE_CODE,
  GET_USER_CONTACTS,
  GET_TOKEN_OWNER,
  CONFIRM_CONNECTION
} from '../actions/actionTypes'
import Axios from 'axios'

const getAuthenticationState = (state) => state.user.authenticated
const getUserID = (state) => state.user.profile.id
const getTempConfirmToken = (state) => state.sharing.tempScanConfirmToken

function* handleShareCode(params) {
  yield takeEvery(HANDLE_SHARE_CODE, function*(action) {
    let userAuthenticated = yield select(getAuthenticationState)
    if(userAuthenticated) {
      const response = yield call(()=>Axios({
        method: 'POST',
        url: endpoint(RUN_SHARE_CODE_URI),
        data: {
          token: action.payload.shareCode
        },
        withCredentials: true,
        validateStatus: () => true
      }))
      if(isHTTPSuccess(response)) {
        yield put(actions.clearShareCode())
        yield put(actions.getUserContacts())
      }
    }
    yield put(actions.saveShareCode(action.payload.shareCode))
  })
}

function* getShareCode(parmas) {
  yield takeEvery(GET_USER_SHARE_CODE, function*(action) {
    const userID = yield select(getUserID)
    const response = yield call(()=>Axios({
      method: 'GET',
      url: endpoint(GET_SHARE_CODE_URI),
      withCredentials: true,
      validateStatus: () => true
    }))
    yield put(actions.storeUserShareCode(response.data.token))
  })
}

function* getUserContacts(parmas) {
  yield takeEvery(GET_USER_CONTACTS, function*(action) {
    const response = yield call(()=>Axios({
      method: 'GET',
      url: endpoint(GET_USER_CONTACTS_URI),
      withCredentials: true,
      validateStatus: () => true
    }))
    yield put(actions.storeUserContacts(response.data))
  })
}

function* getTokenOwner(params) {
  yield takeEvery(GET_TOKEN_OWNER, function*(action) {
    const response = yield call(() => Axios({
      method: 'POST',
      url: endpoint(GET_TOKEN_OWNER_URI),
      withCredentials: true,
      data: {
        token: action.payload.token
      },
      validateStatus: () => true
    }))
    if(isHTTPSuccess(response))
      yield put(actions.storeScannedProfileResult(response.data.profile, response.data.confirmToken))
  })
}

function* confirmConnection(params) {
  yield takeEvery(CONFIRM_CONNECTION, function*(action) {
    const token =  yield select(getTempConfirmToken)
    const response = yield call(() => Axios({
      method: 'POST',
      url: endpoint(CONFIRM_CONNECTION_URI),
      withCredentials: true,
      data: {
        id: action.payload.id,
        token
      },
      validateStatus: () => true
    }))
    if(isHTTPSuccess(response)) {
      yield put(actions.storeConnection(response.data.profile))
      //yield put(push('/'))
    }
  })
}

const sharingSaga = [
  handleShareCode(),
  getShareCode(),
  getUserContacts(),
  getTokenOwner(),
  confirmConnection()
]

export default sharingSaga
