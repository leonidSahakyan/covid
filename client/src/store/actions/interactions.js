import {
  UPDATE_SETTINGS,
  SUBMIT_CONTACT_FORM,
  STORE_COVID_STATE,
  STORE_SETTINGS,
  SUBMIT_REPORT,
  SUBMIT_TESTED_POS_PREVIOUSLY,
  DELETE_ACCOUNT,
  STORE_COVID_INSTANCE,
  DELETE_COVID_STATE,
  STORE_TESTED_POS_PREV,
  UPDATE_LEGAL_CONSENT,
  STORE_CURRENT_LEGAL_CONSENT
} from './actionTypes'

export const updateSettings = (settings) => {
  return {
    type: UPDATE_SETTINGS,
    payload: {
      settings: settings
    }
  }
}

export const storeSettings = (settings) => {
  return {
    type: STORE_SETTINGS,
    payload: {
      settings: settings
    }
  }
}

export const submitContactForm = (form_name, full_name, email, subject, message) => {
  return {
    type: SUBMIT_CONTACT_FORM,
    payload: {
      form_name: form_name,
      full_name: full_name,
      email: email,
      subject: subject,
      message: message
    }
  }
}

export const storeSelectedState = (state) => {
  return {
    type: STORE_COVID_STATE,
    payload: {
      state: state
    }
  }
}

export const submitReport = (report) => {
  return {
    type: SUBMIT_REPORT,
    payload: {
      report
    }
  }
}

export const submitTestedPosPreviously = (value, date = null) => {
  return {
    type: SUBMIT_TESTED_POS_PREVIOUSLY,
    payload: {
      previously_tested_positive: value,
      date
    }
  }
}

export const deleteAccount = () => {
  return {
    type: DELETE_ACCOUNT
  }
}

export const storeCovidInstance = (instance) => {
  return {
    type: STORE_COVID_INSTANCE,
    payload : {
      covidInstance: instance
    }
  }
}

export const deleteSelectedState = () => {
  return {
    type: DELETE_COVID_STATE
  }
}

export const storeTestedPosPrev = (value) => {
  return {
    type: STORE_TESTED_POS_PREV,
    payload: {
      testedPosPrev: value
    }
  }
}

export const updateLegalConsent = () => {
  return {
    type: UPDATE_LEGAL_CONSENT
  }
}

export const storeCurrentLegalConsent = () => {
  return {
    type: STORE_CURRENT_LEGAL_CONSENT
  }
}