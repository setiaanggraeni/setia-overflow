const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const axios = require('axios')
var nodemailer = require('nodemailer')

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
                  res.status(201).json({token: token, user: user})
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
      res.status(400).json({
        err,
        message: 'Register failed!'
      })
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
    .catch(err => {
      res.status(400).json({
        err,
        message: 'User not found!'
      })
    })
  }

  static loginFb(req, res){
    let urlUserInfo = `https://graph.facebook.com/me?fields=id,name,email&access_token=${req.body.fbToken}`
    axios({
      method: 'POST',
      url: urlUserInfo,
      data:{}
    })
    .then(response => {
      var salt = bcrypt.genSaltSync(8)
      var hash = bcrypt.hashSync(response.data.id, salt)
      User.findOne({email: response.data.email})
      .then(user => {
        if(!user){
          User.create({
            name: response.data.name,
            email: response.data.email,
            password: hash
          })
          .then(newUser => {
            User.findOne({email: response.data.email})
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
            res.status(400).json({
              message: 'Register failed',
              err
            })
          })
        } else {
          let compare = bcrypt.compareSync(response.data.id, user.password)
          if(compare){
            jwt.sign({id: user._id, name: user.name, email: user.email}, process.env.secretKey, (err, token) => {
              if(err) res.status(401).json('Failed to sign token')
              res.status(201).json({token: token})
            })
          } else {
              res.status(401).json({
                message: 'Login failed, please check your email/password!'
              })
          }
        }
      })
      .catch(err => {
        res.status(400).json({
            message: 'login with fb error'
        })
      })
    })
    .catch(err => {
        res.status(400).json({
            message: 'fb error'
        })
    })
  }

  static sendMail(req, res){
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${process.env.email}`,
        pass: `${process.env.emailpass}`
      }
    })
      
    var mailOptions = {
      from: `${process.env.email}`,
      to: `${req.body.email}`,
      subject: 'Hacktiv-Overflow Setia Anggraeni',
      text: `Enjoy to sharing with Setia-Hacktiv-Overflow ${req.body.name}`
    }
      
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.status(500).json(error.message)
      } else {
        res.status(200).json(info.response)
      }
    })
  }

  static verify (req, res) {
    if (req.user !== undefined) {
      res.status(201).json(req.user)
    } else {
      res.status(400).json({
        message: 'Token invalid'
      })
    }
  }
}

module.exports = UserController