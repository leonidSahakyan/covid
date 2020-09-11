const asyncHandler = require('express-async-handler')
const db = require('../../models')
const Connection = db.connections
const User = db.users
const StatusReport = db.statusReports
const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')

exports.getUserConnections = asyncHandler(async (req, res, next) => {  
  User.findOne({
    where: {
      id: req.user.id
    }}).then(user => { 
      user.getAccepter({
        attributes: ['name'],
        include: [{model: covid_instance, attributes: ['state'], limit: 1, order: [['date', 'ASC']] }]
      }).then(accepters => {
      user.getRequester({
        attributes: ['name'],
        include: [{model: covid_instance, attributes: ['state'], limit: 1, order: [['date', 'ASC']] }]
      }).then(requesters => {
        res.status(200).send(accepters.map(connection => { return {
          name: connection.name,
          covid_instance: connection.covid_instance
        }}).concat(requesters).map(connection => { return {
          name: connection.name,
          covid_instance: connection.covid_instance
        }}))
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
  }).catch(err => console.log(err))
})

exports.removeUserConnection = asyncHandler(async (req, res, next) => {
  const connection = await Connection.findOne({
    where: { id: req.body.connection_id }
  })

  if(!connection) {
    res.status(500).send("connection doesn't exist")
    return
  }

  if((connection.dataValues.userId_init == req.user.id)
  || (connection.dataValues.userId_rec == req.user.id)) {
    Connection.destroy({
      where: { id: req.body.connection_id }
    }).then(() => {
      res.status(200).send('connection deleted')
    }).catch((err) => {
      res.status(500).send(err)
    })  } else {
    res.status(500).send("You're not a participant in this connection")
  }

})

// for now just get User_Id
exports.generateConnectToken = (req, res, next) => {
  res.status(200).send({
    token: req.user.id
  })
}

exports.revealTokenUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({where: { id: req.body.token}})

  if(!user) {
    res.status(500).send({
      message: 'Invalid token'
    })
  }

  const token = jwt.sign({
    action: 'cc',
    id: user.id
  },
  process.env.JWT_SECRET,
  {
    expiresIn: '10m'
  })

  res.status(200).send({
    profile: {
      id: user.id,
      name: user.name,
    },
    confirmToken: token
  })
})

exports.runConnectToken = asyncHandler(async (req, res, next) => {
  User.findOne({ where: { id: req.user.id}}).then(requester => {
    User.findOne({ where: { id: req.body.token }}).then(accepter => {
      if(!accepter) res.status(406).send("user doesn't exist")
      requester.addAccepter(accepter, { through: { isAccepted: true }}).then(() => {
        res.status(200).send('Connected')
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
  }).catch(err => console.log(err))
})

exports.confirmConnection = asyncHandler(async (req, res, next) => {
  if(req.body.token) {
    jwt.verify(req.body.token, process.env.JWT_SECRET, function(err, decoded){
      if(err || decoded.action !== 'cc') {
        res.status(401).send('invalid token')
      } else {
        User.findByPk(req.user.id).then(accepter => {
          User.findOne({ 
            where: { id: decoded.id },
            include: [{model: StatusReport, attributes: ['state', 'date'], limit: 1, order: [['date', 'ASC']] }]
          }).then(requester => {
            requester.addAccepter(accepter, { through: { isAccepted: true }})
            console.log(requester)
            res.status(200).send({
              profile: {
                id: requester.id,
                name: requester.name,
                latest_report: requester.status_reports[0],
                connection: {
                  isAccepted: true,
                  createdAt: new Date()
                }
              }
            })
          }).catch(err => {
            console.log(err)
            res.status(500)
          })
        }).catch(err => {
          res.status(500)
          console.log(err)})
      }
    })
  } else {
    res.status(401).send('No connect token')
  }
})
