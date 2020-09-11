import {
  UPDATE_WORLD_TOTALS
} from '../actions/actionTypes'

const initialState = {
  worldTotal: {
    totalDead: 0,
    totalConfirmed: 0,
    totalRecovered: 0
  }
};

function updateCovidData(state, action) {
  return Object.assign({}, state, {
    worldTotal: {
      totalDead: action.payload.totalDead,
      totalConfirmed: action.payload.totalConfirmed,
      totalRecovered: action.payload.totalRecovered
    }
  })
}

export default function jhCovidDataReducer(state = initialState, action) {
  switch(action.type) {
    case UPDATE_WORLD_TOTALS: return updateCovidData(state, action);
    default: break;
  }
  return state;
};
