import {
  USER_AUTHENTICATED,
  STORE_LOGOUT,
  STORE_COVID_STATE,
  STORE_USER_CONTACTS,
  STORE_SETTINGS,
  STORE_AUTH_STATE,
  STORE_USER_GDPR_CONSENT,
  STORE_CONNECTION,
  STORE_REGISTRATION_DETAILS,
  STORE_COVID_INSTANCE,
  DELETE_COVID_STATE,
  STORE_TESTED_POS_PREV,
  STORE_CURRENT_LEGAL_CONSENT
} from '../actions/actionTypes'
import {
  AUTH_STATES, USER_COVID_STATES
} from '../constants'

const initialState = {
  authState: AUTH_STATES.START,
  profile: null,
  covidState: null,
  contacts: [],
  registrationDetails: null,
};

function setUserProfile(state, action) {
  var status = USER_COVID_STATES.RECOVERED_CLEAR
  if(action.payload.user.covid_instance) {
    status = action.payload.covidInstance.status
  }
  return Object.assign({}, state, {
    authState: AUTH_STATES.AUTHENTICATED,
    profile: {
      ...action.payload.user,
      dob: new Date(action.payload.user.dob),
      status: status
    }
  })
}

function logout(state, action) {
  return Object.assign({}, state, {
    profile: null,
    authState: AUTH_STATES.START,
    authenticated: false
  })
}

function storeGDPRConsent(state, action) {
  return Object.assign({}, state, {
    profile: {
      ...state.profile,
      gdpr_consented: action.payload.consented
    }
  })
}

function storeCovidState(state, action) {
  return Object.assign({}, state, {
    selectedState: action.payload.state
  })
}

function deleteCovidState(state, action) {
  return Object.assign({}, state, {
    selectedState: null
  })
}

function updateSettings(state, action) {
  return Object.assign({}, state, {
    profile: action.payload.settings
  })
}

function storeAuthState(state, action) {
  return Object.assign({}, state, {
    authState: action.payload.state
  })
}

function throwOutDuplicates(connections) {
  var uniqueConnections = []
  connections.forEach(connection => {
    if(uniqueConnections.length === 0) uniqueConnections.push(connection)
    if(uniqueConnections.find((el) => { return el.id === connection.id }) === -1)
      uniqueConnections.push(connection)
  })
  return uniqueConnections
}

function storeConnection(state, action) {
  return Object.assign({}, state, {
    contacts: throwOutDuplicates(state.contacts.concat(action.payload.profile))
  })
}

function storeUserConnections(state, action) {
  return Object.assign({}, state, {
    contacts: throwOutDuplicates(action.payload.contacts)
  })
}

function storeRegistrationDetails(state, action) {
  return Object.assign({}, state, {
    registrationDetails: action.payload.settings
  })
}

function storeCovidInstance(state, action) {
  var status = USER_COVID_STATES.RECOVERED_CLEAR
  if(action.payload.covidInstance) {
    status = action.payload.covidInstance.status
  }
  return Object.assign({}, state, {
    profile: {
      ...state.profile,
      status: status,
      covid_instance: action.payload.covidInstance || null
    }
  })
}

function storeTestedPosPrev(state, action) {
  return Object.assign({}, state, {
    profile: {
      ...state.profile,
      previously_tested_positive: action.payload.testedPosPrev
    }
  })
}

function storeCurrentLegalConsent(state, action) {
  return Object.assign({}, state, {
    profile: {
      ...state.profile,
      current_legal_consent: true
    }
  })
}

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case USER_AUTHENTICATED: return setUserProfile(state, action);
    case STORE_LOGOUT: return logout(state, action);
    case STORE_USER_GDPR_CONSENT: return storeGDPRConsent(state, action);
    case STORE_COVID_STATE: return storeCovidState(state, action);
    case DELETE_COVID_STATE: return deleteCovidState(state, action);
    case STORE_USER_CONTACTS: return storeUserConnections(state, action);
    case STORE_SETTINGS: return updateSettings(state, action);
    case STORE_AUTH_STATE: return storeAuthState(state, action);
    case STORE_CONNECTION: return storeConnection(state, action);
    case STORE_REGISTRATION_DETAILS: return storeRegistrationDetails(state, action);
    case STORE_COVID_INSTANCE: return storeCovidInstance(state, action);
    case STORE_TESTED_POS_PREV: return storeTestedPosPrev(state, action);
    case STORE_CURRENT_LEGAL_CONSENT: return storeCurrentLegalConsent(state, action);
    default: break;
  }
  return state;
};
