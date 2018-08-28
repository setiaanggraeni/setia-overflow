const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()

var salt = bcrypt.genSaltSync(8)

class UserController{
  static register(req, res){
    let {name, email, password} = req.body
    var hash = bcrypt.hashSync(password, salt)

    User.findOne({email:email})
    .then(user => {
      if(!user){
        if(password.length < 5) {
          res.status(400).json({message: 'Minimum password length is 5!'})
        } else {
          User.create({
            name, email, password: hash
          })
          .then(newUser => {
            User.findOne({email: email})
            .then(user => {
              if(user){
                jwt.sign({id: user._id, name: user.name, email: user.email}, process.env.secretKey, function(err, token) {
                  res.status(201).json({token: token})
                })
              } else {
                res.status(400).json({
                  message: 'Email not found!'
                })
              }
            })
            .catch(err => {
              res.status(400).json(err.message)
            })
          })
          .catch(err => {
            res.status(400).json(err.message)
          })
        }
      } else {
        res.status(400).json({
          message: 'Email already exist!'
        })
      }
    })
    .catch(err => {
      res.status(400).json(err)
    })
  }

  static login(req, res){
    let {email, password} = req.body
    User.findOne({email: email})
    .then(user => {
      if(user){
        let compare = bcrypt.compareSync(password, user.password)
        if(compare){
          jwt.sign({id: user._id, name: user.name, email: user.email}, process.env.secretKey, function(err, token) {
            res.status(201).json({token: token})
          })
        } else {
          res.status(400).json({
            message: 'Wrong password!'
          })
        }
      } else {
        res.status(400).json({
          message: 'Email not found!'
        })
      }
    })
  }
}

module.exports = UserController