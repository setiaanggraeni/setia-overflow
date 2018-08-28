const jwt = require('jsonwebtoken')
const User = require('../models/user')

function auth(req, res, next) {
  let token = req.headers.token
  if (token) {
    jwt.verify(token, process.env.secretKey, function (err, decoded) {
      User.findOne({_id: decoded.id})
      .then(user => {
        if(user){
          req.user = user
          next()
        } else {
          res.status(400).json({
            message: 'Invalid token/user not found!'
          })
        }
      })
    })
  } else {
    res.status(401).json({
      message: 'You have no access!',
    })
  }
}

module.exports = {auth}