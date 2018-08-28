var express = require('express');
var router = express.Router();
const {addQuestion, getAllQuestion, getById, edit, deleteQuestion, search, upvote, downvote} = require('../controllers/question')
const {auth} = require('../middleware/auth')

router.get('/', getAllQuestion)
      .post('/create', auth, addQuestion)
      .get('/find/:id', getById)
      .put('/edit/:id', auth, edit)
      .delete('/delete/:id', auth, deleteQuestion)
      .get('/search', search)
      .put('/upvote/:id', auth, upvote)
      .put('/downvote/:id', auth, downvote)
module.exports = router;
