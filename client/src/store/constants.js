// ENUMS
export const AUTH_STATES = {
  START: 'start',
  WAITING: 'waiting',
  REGISTRATION: 'register',
  FAILED: 'invalid_credentials',
  RESET_SENT: 'password_reset_sent',
  INVALID_TOKEN: 'invalid_token',
  LOG_OUT_FAILED: 'logout_failed',
  AUTHENTICATED: 'authenticated'
}
export const USER_COVID_STATES = {
  TESTED_POSITIVE: 'positive',
  HAVE_SYMPTOMS: 'symptomatic',
  RECOVERED_CLEAR: 'negative',
  NONE: 'no_status'
}

// APIs
const getHostAndPort = () => {
  var url = window.location.href
  var arr = url.split('/')
  return arr[0]+'//'+arr[2]
}
const FACEBOOK_CLIENT_ID = '566073887380055'
export const FB_LOGIN_URL_WITH_PARAMS = (selectedState) => {
  return 'https://www.facebook.com/v7.0/dialog/oauth?'+
  'client_id='+FACEBOOK_CLIENT_ID+
  '&redirect_uri='+getHostAndPort()+'/oauth/facebook'+ 
  '&state={ "covidState":"'+selectedState+'"}'
}
const GOOGLE_CLIENT_ID = '184243219854-qpmgur5a5taii6r686ep247hjmrt0icc.apps.googleusercontent.com'
export const GOOGLE_LOGIN_WITH_PARAMS = (selectedState) => {
  return 'https://accounts.google.com/o/oauth2/v2/auth?'+
  'scope=https://www.googleapis.com/auth/userinfo.profile'+ 
  '&include_granted_scopes=true'+
  '&response_type=code'+
  '&state={ "covidState":"'+selectedState+'"}'+
  '&redirect_uri='+getHostAndPort()+'/oauth/google'+
  '&client_id='+GOOGLE_CLIENT_ID
}
export const JH_WORLD_SUMMARY_URL = 'https://api.covid19api.com/world/total';
export const GA_TRACKING_ID = ''


// Handle local, dev and production urls
export const endpoint = (uri) => {
  return '/api/v1/' + uri
};

// URIs
export const LOGIN_API_URI = 'login-email'
export const REGISTER_API_URI = 'register-email'
export const API_GET_USER_URI = 'get-user'
export const UPDATE_GDPR_URI = 'consent-to-gdpr'
export const UPDATE_COVID_STATE_URI = 'new-covid-status-report'
export const PRIVACY_POLICY_URI = 'privacy'
export const DISCLAIMER_URI ='disclaimer'
export const TERMS_URI = 'terms'
export const COOKIES_URI = 'cookies'
export const UPDATE_SETTINGS_URI = 'update-settings'
export const LOGOUT_URI = 'logout'
export const CONTACT_URI = 'new-contact-form-submission'
export const GET_SHARE_CODE_URI = 'get-connect-token'
export const RUN_SHARE_CODE_URI = 'run-connect-token'
export const GET_USER_CONTACTS_URI = 'get-user-connections'
export const GET_TOKEN_OWNER_URI = 'reveal-connect-token'
export const REMOVE_USER_CONNECTION = 'remove-user-connection'
export const CMS_DATA_URI = 'get-app-data'
export const OAUTH_FACEBOOK_URI = 'oauth/facebook'
export const OAUTH_GOOGLE_URI = 'oauth/google'
export const PASSWORD_UPDATE_URI = 'reset-password'
export const GET_PASSWORD_RESET_TOKEN_URI = 'forgot-password'
export const CONFIRM_CONNECTION_URI = 'confirm-connection'
export const SUBMIT_REPORT_URI = 'submit-report'
export const SUBMIT_TESTED_POS_PREVIOUSLY_URI = 'tested-pos-previously'
export const DELETE_ACCOUNT_URI = 'delete-my-data'
export const UPDATE_LEGAL_CONSENT_URI = 'update-legal-consent'
export const VERIFY_EMAIL_URI = 'send-email-verification'

// HTTP
export const HTTP_CODES = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  AUTHORISATION_FAILED: 401,
  ERROR: 500
}
export const isHTTPSuccess = (response) => {
  if(response === undefined) return false
  return response.status === HTTP_CODES.SUCCESS
}
export const isHTTPUnauthorised = (response) => {
  if(response === undefined) return true
  return response.status === HTTP_CODES.AUTHORIZATION_FAILED
}
export const isHTTPError = (response) => {
  if(response === undefined) return true
  return response.status === HTTP_CODES.ERROR
}
export const isHTTPBadRequest = (response) => {
  if(response === undefined) return true
  return response.status === HTTP_CODES.BAD_REQUEST
}
