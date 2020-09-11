/*
  This file contains the generator functions for the saga middleware relating
  to any user interactions after authentication.
*/

import { takeEvery, put, call, select } from 'redux-saga/effects'
import actions from '../actions/index'
import {
  SUBMIT_REPORT_URI,
  CONTACT_URI,
  UPDATE_SETTINGS_URI,
  SUBMIT_TESTED_POS_PREVIOUSLY_URI,
  DELETE_ACCOUNT_URI,
  UPDATE_LEGAL_CONSENT_URI,
  endpoint,
  isHTTPSuccess
} from '../constants'
import {
  UPDATE_SETTINGS,
  SUBMIT_REPORT,
  SUBMIT_CONTACT_FORM,
  SUBMIT_TESTED_POS_PREVIOUSLY,
  DELETE_ACCOUNT,
  UPDATE_LEGAL_CONSENT
} from '../actions/actionTypes'
import Axios from 'axios';

function* submitCovidReport(params) {
  yield takeEvery(SUBMIT_REPORT, function*(action) {
    const response = yield call(() => Axios({
      method: 'POST',
      url: endpoint(SUBMIT_REPORT_URI),
      data: action.payload,
      withCredentials: true,
      validateStatus: () => true
    }).catch((err) => {
      console.log(err)
    })
  )
  if(isHTTPSuccess(response)) {
    yield put(actions.storeCovidInstance(response.data.covid_instance))
    yield put(actions.deleteSelectedState())
  }
})}

function* submitContactForm(params) {
  yield takeEvery(SUBMIT_CONTACT_FORM, function*(action) {
    const response = yield call(()=> Axios({
      method: 'POST',
      url: endpoint(CONTACT_URI),
      data: action.payload,
      validateStatus: () => true
    }))
  })
}

function* saveSettings(params) {
  yield takeEvery(UPDATE_SETTINGS, function*(action) {
    const response = yield call(() => Axios({
      method: 'POST',
      url: endpoint(UPDATE_SETTINGS_URI),
      data: action.payload.settings,
      withCredentials: true,
      validateStatus: () => true
    }).catch((err) => {
        console.log(err)
      })
    )
    if(isHTTPSuccess(response)) {
      yield put(actions.updateCurrentUser(response.data.user))
    }
  })
}

function* submitTestedPosPrev(params) {
  yield takeEvery(SUBMIT_TESTED_POS_PREVIOUSLY, function*(action) {
    const response = yield call(() => Axios({
      method: 'POST',
      url: endpoint(SUBMIT_TESTED_POS_PREVIOUSLY_URI),
      data: {
        previously_tested_positive: action.payload.previously_tested_positive,
        date: action.payload.date
      },
      withCredentials: true,
      validateStatus: () => true
    }))
    if(isHTTPSuccess(response)) {
      yield put(actions.storeTestedPosPrev(action.payload.previously_tested_positive))
    }
  })
}

function* deleteMyData(params) {
  yield takeEvery(DELETE_ACCOUNT, function* (action) {
    const response = yield call(() => Axios({
      method: 'GET',
      url: endpoint(DELETE_ACCOUNT_URI),
      withCredentials: true,
      validateStatus: () => true
    }))
    if(isHTTPSuccess(response)) {
      yield put(actions.storeLogout())
    }
  })
}

function* updateLegalConsent(params) {
  yield takeEvery(UPDATE_LEGAL_CONSENT, function* (action) {
    const response = yield call(() => Axios({
      method: 'GET',
      url: endpoint(UPDATE_LEGAL_CONSENT_URI),
      withCredentials: true,
      validateStatus: () => true
    }))
    if(isHTTPSuccess(response)) {
      yield put(actions.storeCurrentLegalConsent())
    }
  })
}

const userInteractionSagas = [
  submitCovidReport(),
  submitContactForm(),
  saveSettings(),
  submitTestedPosPrev(),
  deleteMyData(),
  updateLegalConsent()
]

export default userInteractionSagas
