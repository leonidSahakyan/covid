import {
    STORE_CMS_DATA
} from '../actions/actionTypes'

const initialState = {
  data: []
};

function storeData(state, action) {
  // does it already exist?
  let index = state.app.data.findIndex((data, index) => {
    return data.key === action.payload.data.key
  })
  // if it doesn't
  if(index === -1) {
    return Object.assign({}, state, {
      data: state.cms.data.concat(action.payload.data)
    })
  } else {
    let data = Array.from(state.cms.data)
    data[index] = action.payload.data
    return Object.assign({}, state, {
      data: data
    })
  }
}

export default function cmsReducer(state = initialState, action) {
  switch(action.type) {
    case STORE_CMS_DATA: return storeData(state, action);
    default: break;
  }
  return state;
};
