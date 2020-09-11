import {
  getCurrentUser,
  updateCurrentUser,
  logout,
  storeLogout,
  updateAuthState,
  //oauthFacebook,
  //oauthGoogle,
  getPasswordResetToken,
  updateUserPassword,
  login,
  register,
  storeRegistrationDetails
} from './auth'
import {
  updateSettings,
  submitContactForm,
  storeSelectedState,
  deleteSelectedState,
  storeSettings,
  submitReport,
  deleteAccount,
  submitTestedPosPreviously,
  storeCovidInstance,
  storeTestedPosPrev,
  updateLegalConsent,
  storeCurrentLegalConsent 
} from './interactions'
import {
  getJHCovidData,
  storeJHCovidData
} from './jhCovidData'
import {
  handleShareCode,
  saveShareCode,
  getShareCode,
  storeUserShareCode,
  getUserContacts,
  storeUserContacts,
  clearShareCode,
  revealTokenOwner,
  storeScannedProfileResult,
  confirmConnection,
  storeConnection
} from './sharing'

const actions = {
  storeJHCovidData,
  updateCurrentUser,
  getJHCovidData,
  getCurrentUser,
  handleShareCode,
  saveShareCode,
  storeSelectedState,
  updateSettings,
  logout,
  storeLogout,
  submitContactForm,
  getShareCode,
  storeUserShareCode,
  getUserContacts,
  storeUserContacts,
  storeSettings,
  updateAuthState,
  clearShareCode,
  //oauthFacebook,
  //oauthGoogle,
  updateUserPassword,
  getPasswordResetToken,
  revealTokenOwner,
  storeScannedProfileResult,
  confirmConnection,
  storeConnection,
  storeRegistrationDetails,
  login,
  register,
  submitReport,
  deleteAccount,
  submitTestedPosPreviously,
  storeCovidInstance,
  deleteSelectedState,
  storeTestedPosPrev,
  updateLegalConsent,
  storeCurrentLegalConsent 
}

export default actions
