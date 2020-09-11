const asyncHandler = require('express-async-handler')
const db = require('../../models')
const User = db.users
const CovidInstances = db.covid_instances
const { Op } = require('sequelize')
const sendEmail = require('../../util/email')
const { ExtractJwt } = require('passport-jwt')
const jwt = require('jsonwebtoken')
var path = require('path');

exports.returnUser = asyncHandler(async (req, res, next) => {
  try {
    // get profile to return to react
    const profile = req.user.dataValues;
    delete profile.password;
    if(profile.covid_instance) {
      profile.covid_instance = await CovidInstances.findByPk(profile.covid_instance)
    }

    profile.current_legal_consent = profile.legal_version_consent == process.env.LEGAL_VERSION_CONSENT

    res.status(200).send({
      user: profile,
    })

  } catch(err) {
    res.status(500).send(err.message)
  }
})

exports.submitReport = asyncHandler(async (req, res, next) => {
  try {
    var instance;
    if(req.user.covid_instance) {
      instance = await CovidInstances.findByPk(req.user.covid_instance)
      if(req.body.report.nextStatus == 'negative'){
        await instance.destroy()
        return res.status(200).send()
      }
      if(!instance.date_symptoms_started)
        instance.date_symptoms_started = req.body.report.dateSymptomsStarted
      if(!instance.date_tested_positive)
        instance.date_tested_positive = req.body.report.dateTestedPositive
      if(!instance.date_tested_negative)
        instance.date_tested_negative = req.body.report.dateTestedNegative 
      instance.status = req.body.report.nextStatus   
      await instance.save()
    } else {
      if(req.body.report.nextStatus == 'negative')
        return res.status(200).send()
      const report = {
        date_symtpoms_started: req.body.report.dateSymptomsStarted,
        date_tested_positive: req.body.report.dateTestedPositive,
        date_tested_negative: req.body.report.dateTestedNegative,
        status: req.body.report.nextStatus
      }
      instance = await CovidInstances.create(report)
      req.user.covid_instance = instance.id
      req.user.save() 
    }
    res.status(200).send({ covid_instance: instance })
  } catch(err) {
    res.status(500).send(err.message)
  }
})

exports.updateUserSettings = asyncHandler( async(req, res, next) => {
  try {
    if(req.body.email) {
      const token = jwt.sign({
        id: req.user.dataValues.id,
        action: 'verify email',
        email: req.body.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      })
      const URL = 'https://localhost:5000/api/v1/verify-email/'+token
      sendEmail({
        from: 'Chainbreak <noreply@chainbreak.com>',
        to: req.body.email,
        subject: 'Verify email',
        message: 'Someone has signed up to chainbreak the Coronavirus warning system with your email, if this was you please paste the link below into your browser.\n\n'+URL+'\n\nRegards,\nThe Chainbreak Team.'
      })
    }

    if(req.body.phone) {
      //handle phone verification
    }

    if(typeof req.body.name != 'undefined')
      req.user.name = req.body.name
    req.user.gender = req.body.gender || req.user.gender
    if(typeof req.body.dob != 'undefined')
      req.user.dob = new Date(req.body.dob)
    if(typeof req.body.city != 'undefined')
      req.user.city = req.body.city
    if(typeof req.body.county != 'undefined')
      req.user.county = req.body.county
    if(typeof req.body.country != 'undefined')
      req.user.country = req.body.country
    req.user.autosharing_on = req.body.autosharing_on || req.user.autosharing_on
    req.user.interested_htk = req.body.interested_htk || req.user.interested_htk
    req.user.interested_ppe = req.body.interested_ppe || req.user.interested_ppe
    req.user.notifications_on = req.body.notifications_on || req.user.notifications_on

    await req.user.save()
    next()
  } catch(err) {
    res.status(500).send(err)  
  }
})

exports.verifyEmail = asyncHandler(async(req,res,next) => {
  jwt.verify(req.params.token, process.env.JWT_SECRET, async function(err, decoded) {
    try {
      if(err) res.status(500).send(err.message)
      if(decoded.action !== 'verify email') res.status(401).send('token not valid for this action')
      const now = new Date().getTime()
      if(decoded.exp*1000 < now )return res.status(401).send('Token expired, please log back in a request a new email be sent via settings.')
      const user = await User.findOne({email: decoded.email})
      if(!user) res.status(400).send("user doesn't exist")
      user.email = decoded.email
      user.email_verified = true
      await user.save()
      res.status(200).sendFile(path.join(__dirname, '..', '..', 'views', 'emailVerified.html' )
      )
    } catch(err) {
      res.status(500).send(err.message)
    }
  })
})

exports.submitTestedPosPrev = (req, res, next) => {
  try {
    if(req.user.previously_tested_positive !== null) {
      res.status(400).send('This has already been set')
    } else {
      if(req.body.previously_tested_positive) {
        req.user.previously_tested_positive = true
        req.user.previously_tested_positive_date = req.body.date
      } else {
        req.user.previously_tested_positive = false
        req.user.previously_tested_positive_date = null
      }
      req.user.save()
      res.status(200).send('success')
    }
  } catch(err) {
    res.status(500).send(err.message)
  }
}

exports.deleteAllData = asyncHandler(async (req, res, next) => {
  try {
    await req.user.destroy()
    res.status(200).send()
  } catch(err) {
    res.status(500).send(err.message)
  }
})

exports.updateLegalConsent = asyncHandler(async (req, res, next) => {
  try {
    req.user.legal_version_consent = process.env.LEGAL_VERSION_CONSENT
    await req.user.save()
    res.status(200).send()
  } catch(err) {
    res.status(500).send(err.message)
  }
})

exports.sendEmailVerification = (req, res, next) => {
  try {
    User.sendEmailVerification(req.user.email)
    res.status(200).send()
  } catch(err) {
    res.status(500).send()
  }
}
