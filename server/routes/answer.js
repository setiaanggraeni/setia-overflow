var express = require('express');
var router = express.Router();
const {addAnswer, deleteAnswer, edit, upvote, downvote} = require('../controllers/answer')
const {auth} = require('../middleware/auth')

router.post('/create/:id', auth, addAnswer)
      .delete('/delete/:id', auth, deleteAnswer)
      .put('/edit/:id', auth, edit)
      .put('/upvote/:id', auth, upvote)
      .put('/downvote/:id', auth, downvote)
module.exports = router;
