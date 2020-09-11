/*
  This index saga takes the arrays of saga event listener functions exported
  from the other files in the directory concats them and exports them as a
  single root saga.
*/
import { all } from 'redux-saga/effects'
import authenticationSagas from './authentication'
import jhCovidDataSagas from './jhCovidData'
import userInteractionSagas from './interactions'
import sharingSaga from './sharing'

export default function* rootSaga() {
  yield all([].concat(
    jhCovidDataSagas,
    authenticationSagas,
    userInteractionSagas,
    sharingSaga,
  ))
}
