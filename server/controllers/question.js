const Question = require('../models/question')

class QuestionController{
  static addQuestion(req, res){
    let {title, question} = req.body
    Question.create({
      title, question, userId: req.user._id
    })
    .then(newQuestion => {
      res.status(201).json(newQuestion)
    })
    .catch(err => {
      res.status(400).json({
        err,
        message: 'Add article failed!'
      })
    })
  }

  static getAllQuestion(req, res){
    Question.find({})
    .sort({updatedAt: 'descending'})
    .populate('answerId')
    .populate('userId')
    .populate('downvote')
    .populate('upvote')
    .exec(function(err, questions){
      if(err) res.status(400).json({err, message: 'Questions not found!'})
      res.status(201).json(questions)
    })
  }

  static getById(req, res){
    let id = req.params.id
    Question.findOne({_id: id})
    .populate('answerId')
    .populate('userId')
    .populate('downvote')
    .populate('upvote')
    .exec(function (err, result) {
      if(err){
        res.status(400).json({
          err,
          message: 'Failed to find question!'
        })
      } else{
        res.status(200).json(result)
      }
    })
  }

  static edit(req, res){
    let id = req.params.id
    let {title, question} = req.body
    Question.findOne({_id: id})
    .then(theQuestion => {
      if(String(theQuestion.userId._id) == String(req.user._id)){
        Question.update({_id: id}, {
          $set: {
            title, question
          }
        })
        .then(updateQuestion => {
          res.status(201).json(updateQuestion)
        })
        .catch(err => {
          res.status(400).json({
            err,
            message: 'Failed to update question!'
          })
        })
      } else {
        res.status(400).json({
          message: 'you have no access to edit this question!'
        })
      }
    })
  }

  static deleteQuestion(req, res){
    let id = req.params.id
    Question.findOne({_id: id})
    .then(question => {
      if(String(question.userId._id) == String(req.user._id)){
        Question.deleteOne({_id: id})
        .then(deletedQuestion => {
          res.status(201).json({
            message: 'Delete question successfully!'
          })
        })
        .catch(err => {
          res.status(400).json({
            err,
            message: 'Failed to delete question!'
          })
        })
      } else {
        res.status(400).json({
          message: 'you have no access to delete this question!'
        })
      }
    })
  }

  static search (req, res) {
    Question.find({
      $or: [{title: new RegExp(req.query.q, 'i')},
            {question: new RegExp(req.query.q, 'i')},
            ]
    })
    .then(questions => {
      res.status(201).json(questions)
    })
    .catch(err => {
      res.status(400).json(err.message)
    })
  }

  static upvote (req, res) {
    let id = req.params.id
    Question.findOne({_id: id})
    .then(question => {
      if(String(question.userId._id) !== String(req.user._id)){
        Question.update({_id : id}, {
          $addToSet: {upvote: req.user._id},
          $pull: {downvote: req.user._id},
          $inc: {votes: 1}
        })
        .then(result => {
          res.status(201).json(result)
        })
        .catch(err => {
          res.status(400).json({
            message: 'Upvote failed!'
          })
        })
      } else {
        res.status(400).json({
          message: 'You cant vote your own question!'
        })
      }
    })
    .catch(err => {
      res.status(400).json({
        err,
        message: 'Question not found!'
      })
    })
  }

  static downvote (req, res) {
    let id = req.params.id
    Question.findOne({_id: id})
    .then(question => {
      if(String(question.userId._id) !== String(req.user._id)){
        Question.update({_id : id}, {
          $addToSet: {downvote: req.user._id},
          $pull: {upvote: req.user._id},
          $inc: {votes: -1}
        })
        .then(result => {
          res.status(201).json(result)
        })
        .catch(err => {
          res.status(400).json({
            message: 'Downvote failed!'
          })
        })
      } else {
        res.status(400).json({
          message: 'You cant vote your own question!'
        })
      }
    })
    .catch(err => {
      res.status(400).json({
        err,
        message: 'Question not found!'
      })
    })
  }
}

module.exports = QuestionController