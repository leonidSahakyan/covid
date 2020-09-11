
const bcrypt = require('bcryptjs')
const sendEmail = require('../util/email')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
      validate :{
        is: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      }
    },
    email_verified: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        len: [8, 255]
      }
    },
    previously_tested_positive : {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    previously_tested_positive_date: {
      type: Sequelize.DATE,
      allowNull: true
    },
    legal_version_consent : {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    google_id: {
      type: Sequelize.STRING,
      allowNull: true
    },
    facebook_id: {
      type: Sequelize.STRING,
      allowNull: true
    },
    autosharing_on: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    dob: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    country: {
      type: Sequelize.STRING,
      allowNull: true
    },
    county: {
      type: Sequelize.STRING,
      allowNull: true
    },
    city: {
      type: Sequelize.STRING,
      allowNull: true
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: true
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true
    },
    phone_verified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    interested_htk: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    interested_ppe: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    notifications_on: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  });

  User.beforeCreate(async (user, options) => {
    if(!user.password || !user.email) return
    User.sendEmailVerification(user.email)
    user.legal_version_consent = process.env.LEGAL_VERSION_CONSENT
    await new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if(err) return reject(err)
        bcrypt.hash(user.password, salt, (err, hash) => {
          if(err) return reject(err)
          return resolve(hash)
        })
      })
    }).then(hash => {
      user.password = hash
    }).catch(err => {
      console.log(err)
    })
  })

  User.matchPassword = async (plain, hash) => {
    return await bcrypt.compare(plain, hash)
  }

  User.hashPassword = (password) => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if(err) return reject(err)
        bcrypt.hash(password, salt, (err, hash) => {
          if(err) return reject(err)
          return resolve(hash)
        })
      })
    })
  }

  User.sendEmailVerification = (email) => {
    const emailToken = jwt.sign({
      action: 'verify email',
      email: email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d'
    })
    const URL = process.env.THIS_URL + '/api/v1/verify-email/'+emailToken
    sendEmail({
      from: 'Chainbreak <noreply@chainbreak.com>',
      to: email,
      subject: 'Verify email',
      message: 'Someone has signed up to chainbreak the Coronavirus warning system with your email, if this was you please paste the link below into your browser.\n\n'+URL+'\n\nRegards,\nThe Chainbreak Team.'
    })
  }

  return User;
};
