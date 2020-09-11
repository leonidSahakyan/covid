import {
  HANDLE_SHARE_CODE,
  SAVE_SHARE_CODE,
  GET_USER_SHARE_CODE,
  STORE_USER_SHARE_CODE,
  GET_USER_CONTACTS,
  STORE_USER_CONTACTS,
  CLEAR_SHARE_CODE,
  GET_TOKEN_OWNER,
  STORE_TOKEN_OWNER_PROFILE,
  CONFIRM_CONNECTION,
  STORE_CONNECTION
} from './actionTypes'

export const handleShareCode = (code) => {
  return {
    type: HANDLE_SHARE_CODE,
    payload: {
      shareCode: code
    }
  }
}

export const saveShareCode = (code) => {
  return {
    type: SAVE_SHARE_CODE,
    payload: {
      shareCode: code
    }
  }
}

export const getShareCode = () => {
  return {
    type: GET_USER_SHARE_CODE
  }
}

export const storeUserShareCode = (code) => {
  return {
    type: STORE_USER_SHARE_CODE,
    payload: {
      token: code
    }
  }
}

export const getUserContacts = () => {
  return {
    type: GET_USER_CONTACTS
  }
}

export const storeUserContacts = (contacts) => {
  return {
    type: STORE_USER_CONTACTS,
    payload: {
      contacts: contacts
    }
  }
}

export const clearShareCode = () => {
  return {
    type: CLEAR_SHARE_CODE
  }
}

export const revealTokenOwner = (token) => {
  return {
    type: GET_TOKEN_OWNER,
    payload: {
      token
    }
  }
}

export const storeScannedProfileResult = (profile, token) => {
  return {
    type: STORE_TOKEN_OWNER_PROFILE,
    payload: {
      profile,
      token
    }
  }
}

export const confirmConnection = (id) => {
  return {
    type: CONFIRM_CONNECTION,
    payload: {
      id
    }
  }
}

export const storeConnection = (profile) => {
  return {
    type: STORE_CONNECTION,
    payload: {
      profile
    }
  }
}