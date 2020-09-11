const db = require('../../models')
const asyncHandler = require('express-async-handler')
const User = db.users
const Blacklist = db.black_list
const sendEmail = require('../../util/email')
const jwt = require('jsonwebtoken')

exports.loginEmail = asyncHandler(async (req, res, next) => {
  try {
    let user = await User.findOne({where: { email: req.body.settings.email}})
    if(!user) {
      return res.status(200).send('register')
    } else {
      const match = await User.matchPassword(req.body.settings.password, user.password)
      if(!match) return res.status(401).send('unauthorized')
      req.user = user
      const token = await jwt.sign({ 
        id: user.id, 
        access_level: 'restricted',
        type: req.body.settings.stayLoggedIn ? 'long' : 'short'
      }, 
      process.env.JWT_SECRET, { expiresIn: req.body.settings.stayLoggedIn ? '60d' :'10m' })
      const now = new Date()
      let expiry
      if(req.body.settings.stayLoggedIn) 
        expiry = new Date(new Date().setDate(new Date().getDate() + 60))
      else
        expiry = new Date(new Date().setMinutes(new Date().getMinutes() + 10))
      res.cookie('tsf_jwt', token, {
        expires: expiry,
        secure: true,
        httpOnly: true
      })     
      next()
    }
  } catch(err) {
    res.status(500).send(err.message)
  }
})

exports.registerEmail = asyncHandler(async (req, res, next) => {
  try {
    if(!req.body.settings.legalConsent)
      return res.status(401).status('The latest legal texts must be agreed to in order to continue.')
    const newUser = {
      name: req.body.settings.name ,
      email: req.body.settings.email ,
      password: req.body.settings.password ,
    }
    user = await User.create(newUser)
    user = await User.findByPk(user.id)
    const token = await jwt.sign({ 
      id: user.id, 
      access_level: 'restricted',
      type: req.body.settings.stayLoggedIn ? 'long' : 'short'
    }, 
    process.env.JWT_SECRET, { expiresIn: req.body.settings.stayLoggedIn ? '60d' :'10m' })
    const now = new Date()
    let expiry
    if(req.body.settings.stayLoggedIn) 
      expiry = new Date(new Date().setDate(new Date().getDate() + 60))
    else
      expiry = new Date(new Date().setMinutes(new Date().getMinutes() + 10))
    res.cookie('tsf_jwt', token, {
      expires: expiry,
      secure: true,
      httpOnly: true
    })        
    req.user = user
    next()
  } catch(err) {
    res.status(500).send(err.message)
  }
})

exports.protect = asyncHandler(async (req, res, next) => {
  const jwtCookie = req.cookies['tsf_jwt']
  if(jwtCookie) {
    const blacklisted = await Blacklist.findOne({where: { token: jwtCookie}})
    if(blacklisted) return res.status(401).send('token logged out invalid')
    jwt.verify(jwtCookie, process.env.JWT_SECRET, async function(err, decoded) {
      if(err) return res.status(401).send(err.message)
      const user = await User.findByPk(decoded.id)
      if(!user) return res.status(400).send("user doesn't exist anymore")
      req.user = user
      req.access_level = decoded.access_level
      if(decoded.type == 'short') {
        const token = await jwt.sign({ 
          id: user.id, 
          access_level: decoded.access_level || 'full',
          type: 'short'
        }, 
        process.env.JWT_SECRET, { expiresIn: '10m' })
        res.cookie('tsf_jwt', token, {
          expires: new Date(new Date().setMinutes(new Date().getMinutes() + 10)),
          secure: true,
          httpOnly: true
        })      
      }
      next()
    })
  }
  else 
    return res.status(401).send('No authentication token sent with request.')
})

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ where: {email: req.body.email }})
  if(!user) {
    res.status(500).send("Email doesn't exist")
  }
  const token = jwt.sign(
    {
      action: 'cp',
      id: user.id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '10m'
    }
  )
  const resetUrl = `${req.protocol}://${req.get('host')}/password-reset-token/${token}`
  const message = `A password reset request has been made on chainbreak.com for this email address.\n\nIf this was you and you want to reset your password, paste the url ibelow into your browser, otherwaise ignore this email.\n\n${resetUrl}\n\nRegards,\nThe Chainbreak Team.`
  try {
    await sendEmail({
      from: 'Chainbreak <noreply@chainbreak.com>',
      to: req.body.email,
      subject: 'Password Reset Request',
      message
    })
    res.status(200).send('email sent')
  } catch(err) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()
    res.status(500).send('Email could not be sent')
  }
})

exports.resetPassword = asyncHandler(async (req, res, next) => {
  jwt.verify(req.body.token, process.env.JWT_SECRET, async function(err, decoded) {
    if(err) res.status(401).send(err.message)
    if(decoded.action != 'cp') res.status(401).send('token not valid for this action')
    const user = await User.findByPk(decoded.id)
    if(!user) {
      res.status(400).send('invalid token')
    }
    User.hashPassword(req.body.password).then(async (hash) => {
      user.password = hash
      await user.save()
      req.body.settings = {
        email: user.dataValues.email,
        password: req.body.password
      }
      next()
    }).catch(err => {
      console.log(err)
      res.status(500).send(err.message)
    })
  })
})

exports.logout = (req, res, next) => {
  jwt.verify(req.cookies['tsf_jwt'], process.env.JWT_SECRET, async function(err, decoded) {
    if(err) return res.status(401).send(err.message)
    if(decoded.type == 'long') {
      const newBlacklistedToken = {
        token: req.cookies['tsf_jwt']
      }
      Blacklist.create(newBlacklistedToken).next(() => {
        res.status(200).send('token black listed')
      })
    } else {
      res
      .cookie('tsf_jwt', 'deleted', {
        expires: new Date(0),
        secure: true,
        httpOnly: true
      })     
      .status(200).send('this token will expire in less than 10 minutes and will invalidate then.')
    }
  })
}
