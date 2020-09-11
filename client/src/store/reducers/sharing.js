import {
  SAVE_SHARE_CODE,
  STORE_USER_SHARE_CODE,
  CLEAR_SHARE_CODE,
  STORE_TOKEN_OWNER_PROFILE
} from '../actions/actionTypes'

const initialState = {
  shareCode: null, // the one they may have just run
  currentUserShareCode: '', // the one they give to others
  scannedTokenProfile: null,
  tempScanConfirmToken: null
};

function saveShareCode(state, action) {
  return Object.assign({}, state, {
    shareCode: action.payload.shareCode
  })
}

function storeUserShareCode(state, action) {
  return Object.assign({}, state, {
    currentUserShareCode: action.payload.token
  })
}

function clearShareCode(state, action) {
  return Object.assign({}, state, {
    shareCode: null
  })
}

function storeTokenOWnerProfile(state, action) {
  return Object.assign({}, state, {
    scannedTokenProfile: action.payload.profile,
    tempScanConfirmToken: action.payload.token
  })
}

export default function sharingReducer(state = initialState, action) {
  switch(action.type) {
    case SAVE_SHARE_CODE: return saveShareCode(state, action);
    case STORE_USER_SHARE_CODE: return storeUserShareCode(state, action);
    case CLEAR_SHARE_CODE: return clearShareCode(state, action);
    case STORE_TOKEN_OWNER_PROFILE: return storeTokenOWnerProfile(state, action);
    default: break;
  }
  return state;
};
