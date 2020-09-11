const asyncHandler = require('express-async-handler')
const sendEmail = require('../../util/email')

exports.handleContactForm = asyncHandler(async (req, res, next) => {
  try {
    await sendEmail({
      from: 'Chainbreak <noreply@chainbreak.com>',
      to: process.env.CONTACT_US_MAILBOX,
      subject: 'Contat Us: ' + req.body.message,
      message: req.body.full_name + ', ' + req.body.email + '\n\nVIA CONTACT US FORM\n\n' + req.body.message
    })
    res.status(200).send('Form submitted.')
  } catch(err) {
    res.status(500).send(err.message)   
  }
})