var express = require('express');
var router = express.Router();
const {register, login, loginFb, verify, sendMail} = require('../controllers/user')
const {auth} = require('../middleware/auth')
router.post('/register', register)
      .post('/login', login)
      .post('/loginFb', loginFb)
      .get('/verify', auth, verify)
      .post('/sendmail', auth, sendMail)
module.exports = router;
