const express = require('express')
const path = require('path');
const router = express.Router()

const {
  logout,
  forgotPassword,
  resetPassword,
  protect,
  loginEmail,
  registerEmail,
 } = require('../../controllers/v1/auth')
const {
   returnUser,
   updateUserSettings,
   verifyEmail,
   submitTestedPosPrev,
   deleteAllData,
   submitReport,
   updateLegalConsent,
   sendEmailVerification
} = require('../../controllers/v1/user')
const {
  getUserConnections,
  removeUserConnection,
  generateConnectToken,
  revokeConnectToken,
  revealTokenUser,
  runConnectToken,
  confirmConnection
} = require('../../controllers/v1/connections')
const {
  handleContactForm
} = require('../../controllers/v1/other')

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/docs.html'))
})

// Auth
router.post('/login-email', loginEmail, returnUser)
router.post('/register-email', registerEmail, returnUser)
//router.post('/oauth/google', googleAuth, login)
//router.post('/oauth/facebook', exchangeFBAuthForAccess, passport.authenticate('facebook-token', { session: false }), login)
//router.post('/oauth/twitter/token', twitterAuth)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.get('/logout', protect, logout)

// User
router.get('/get-user', protect, returnUser)
router.post('/update-settings', protect, updateUserSettings, returnUser)
router.get('/verify-email/:token', verifyEmail)
router.get('/send-email-verification', protect, sendEmailVerification)
router.post('/tested-pos-previously', protect, submitTestedPosPrev)
router.get('/delete-my-data', protect, deleteAllData, logout)
router.post('/submit-report', protect, submitReport)
router.get('/update-legal-consent', protect, updateLegalConsent)

// Connections
router.get('/get-user-connections', protect, getUserConnections)
router.delete('/remove-user-connection', protect, removeUserConnection)
router.get('/get-connect-token', protect, generateConnectToken)
router.post('/reveal-connect-token', protect, revealTokenUser)
router.post('/run-connect-token', protect, runConnectToken)
router.post('/confirm-connection', protect, confirmConnection)

// Other
router.post('/new-contact-form-submission', handleContactForm)
module.exports = router;
