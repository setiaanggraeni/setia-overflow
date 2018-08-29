var express = require('express');
var router = express.Router();
const {addAnswer, deleteAnswer, edit} = require('../controllers/answer')
const {auth} = require('../middleware/auth')

router.post('/create/:id', auth, addAnswer)
      .delete('/delete/:id', auth, deleteAnswer)
      .put('/edit/:id', auth, edit)
module.exports = router;
