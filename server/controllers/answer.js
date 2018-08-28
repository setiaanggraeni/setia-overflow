const Answer = require('../models/answer')
const Question = require('../models/question')

class AnswerController {
  static addAnswer(req, res){
    console.log('masuk sini answer');
    
    let questionId = req.params.id
    let {answer} = req.body
        Answer.create({
          answer, userId: req.user._id, username: req.user.name
        })
        .then(newAnswer => {
          Question.update({_id: questionId}, {
            $push: {
              answerId: newAnswer._id
            }
          })
          .then(addNewAnswerToQuestion => {
            res.status(201).json({newAnswer, addNewAnswerToQuestion})
          })
          .catch(err => {
            res.status(400).json({
              err,
              message: 'Failed to push answerId to Question'
            })
          })

        })
        .catch(err => {
          res.status(400).json({
            err,
            message: 'Failed to post answer!'
          })
        })
  }

  static deleteAnswer(req, res){
    let id = req.params.id
    Answer.findOne({_id: id})
    .then(answer => {
      if(String(answer.userId) == String(req.user._id)){
        Answer.deleteOne({_id: id})
        .then(delAnswer => {
          res.status(201).json({
            message: 'Delete answer successfully!'
          })
        })
        .catch(err => {
          res.status(400).json({
            err,
            message: 'Failed to delete answer!'
          })
        })
      } else {
        res.status(400).json({
          message: 'You have no access to delete this answer!'
        })
      }
    })
    .catch(err => {
      res.status(400).json({
        err,
        message: 'Answer not found!'
      })
    })
  }

  static edit(req, res){
    let id = req.params.id
    let answer = req.body
    Answer.findOne({_id: id})
    .then(theAnswer => {
      if(String(theAnswer.userId) == String(req.user._id)){
        Answer.update({_id: id}, {
          $set: {
            answer, userId: req.user._id, username: req.user.name
          }
        })
        .then(updateAnswer => {
          res.status(201).json('Update answer successfully!')
        })
        .catch(err => {
          res.status(400).json({
            err,
            message: 'Failed to edit answer!'
          })
        })
      } else {
        res.status(400).json({
          message: 'You have no access to edit this answer!'
        })
      }
    })
    .catch(err => {
      res.status(400).json({
        err,
        message: 'Answer not found!'
      })
    })
  }

  static upvote (req, res) {
    let id = req.params.id
    Answer.findOne({_id: id})
    .then(answer => {
      if(String(answer.userId._id) !== String(req.user._id)){
        Answer.update({_id : id}, {
          $addToSet: {upvote: req.user._id},
          $pull: {downvote: req.user._id},
          $set: {votes: answer.upvote.length}
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
          message: 'You cant vote your own answer!'
        })
      }
    })
    .catch(err => {
      res.status(400).json({
        err,
        message: 'Answer not found!'
      })
    })
  }

  static downvote (req, res) {
    let id = req.params.id
    Answer.findOne({_id: id})
    .then(answer => {
      if(String(answer.userId._id) !== String(req.user._id)){
        Answer.update({_id : id}, {
          $addToSet: {downvote: req.user._id},
          $pull: {upvote: req.user._id},
          $set: {votes: answer.upvote.length}
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
          message: 'You cant vote your own answer!'
        })
      }
    })
    .catch(err => {
      res.status(400).json({
        err,
        message: 'Answer not found!'
      })
    })
  }

}

module.exports = AnswerController