/*
  This file contains the generator functions for the saga middleware relating
  to the daily totals. References are placed into an array and exported to the
  root saga.
*/

import { takeEvery, put, call } from 'redux-saga/effects'
import {
  JH_WORLD_SUMMARY_URL,
  isHTTPSuccess
} from '../constants'
import {
  GET_WORLD_TOTALS
} from '../actions/actionTypes'
import actions from '../actions/index';
import Axios from 'axios';

function* handleJHCovidDataRequest(params) {
  yield takeEvery(GET_WORLD_TOTALS, function*(action) {
      const response = yield call(() => Axios.get(JH_WORLD_SUMMARY_URL).catch((err) => console.log(err)))
      if(isHTTPSuccess(response)) {
        let payload = {
              totalDead: response.data.TotalDeaths,
              totalConfirmed: response.data.TotalConfirmed,
              totalRecovered: response.data.TotalRecovered
        }
        yield put(actions.storeJHCovidData(payload))
      } else {
        console.log(response)
      }
    })
}

const jhCovidDataSagas = [
  handleJHCovidDataRequest()
]

export default jhCovidDataSagas
