var express = require('express');
var router = express.Router();
const {register, login, loginFb} = require('../controllers/user')

router.post('/register', register)
      .post('/login', login)
      .post('/loginFb', loginFb)

module.exports = router;
