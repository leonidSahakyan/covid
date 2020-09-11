const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const axios = require('axios')
const {google} = require('googleapis');
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_SECRET,
  process.env.GOOGLE_REDIRECT
);
const Twitter = require('node-twitter-api')
var twitter = new Twitter({
  consumerKey: process.env.TWITTER_CLIENT_KEY,
  consumerSecret: process.env.TWITTER_SECRET,
  callback: process.env.TWITTER_CALLBACK
})
var _requestSecret
const db = require('../models/index');
const { request } = require('../app');
const User = db.users
const jwt = require('jsonwebtoken')
const sendEmail = require('./email')

exports.exchangeFBAuthForAccess = asyncHandler(async (req, res, next) => {
  const authCode = req.body.access_token
  axios({
    method: 'GET',
    url: 'https://graph.facebook.com/v7.0/oauth/access_token?client_id='+process.env.FACEBOOK_CLIENT_ID+'&redirect_uri='+process.env.FACEBOOK_REDIRECT+'&client_secret='+process.env.FACEBOOK_SECRET+'&code='+authCode
  }).then(response => {
    req.body.access_token = response.data.access_token
    next()
  }).catch(err => console.log(err))
})

exports.googleAuth = asyncHandler(async (req, res, next) => {
  const authCode = req.body.access_token
  const access_token = await oauth2Client.getToken(authCode)
  const profile = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo?access_token='+access_token.tokens.access_token,
    method: 'GET'
  }).catch(err => console.log(err))
  try {
    const existingUser = await User.findOne({ where: { 'google_id': profile.data.id}})
    if(existingUser) {
      req.user = existingUser
      return next()
    } else {
      const newUser = {
        google_id: profile.data.id,
        name: profile.data.name,
        email: profile.data.email,
        dob: new Date().toString().substring(0,10),
      }
      User.create(newUser).then((user) => {
        try { 
          req.user = user
          const token = jwt.sign({
            id: req.user.dataValues.id,
            action: 'verify email',
            email: req.user.dataValues.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '1d'
          })
          const URL = 'https://localhost:5000/api/v1/verify-email/'+token
          sendEmail({
            from: 'Chainbreak <noreply@chainbreak.com>',
            to: req.user.dataValues.email,
            subject: 'Verify email',
            message: 'Someone has signed up to chainbreak the Coronavirus warning system with your email, if this was you please paste the link below into your browser.\n\n'+URL+'\n\nRegards,\nThe Chainbreak Team.'
          })
          next()
        } catch(err) {
          res.status(500).send(err.message)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  } catch(err) {
    console.log(err)
  }
})

exports.twitterAuth = asyncHandler(async (req, res, next) => {
  twitter.getRequestToken((err, requestToken, requestSecret) => {
    if(err) res.status(500).send(err)
    else {
      _requestSecret = requestSecret
      res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken);
    }
  })
})