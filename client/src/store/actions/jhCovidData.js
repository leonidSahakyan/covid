import {
  GET_WORLD_TOTALS,
  UPDATE_WORLD_TOTALS
} from './actionTypes'

export const getJHCovidData = () => {
  return {
    type: GET_WORLD_TOTALS
  }
}

export const storeJHCovidData = (payload) => {
  return {
    type: UPDATE_WORLD_TOTALS,
    payload
  }
}
