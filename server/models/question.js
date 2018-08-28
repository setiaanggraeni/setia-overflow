var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  answerId: [{ type: Schema.Types.ObjectId, ref: 'Answers' }],
  userId: { type: Schema.Types.ObjectId, ref: 'Users' },
  votes: { type: Number, default: 0},
  downvote: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  upvote: [{ type: Schema.Types.ObjectId, ref: 'Users' }]
}, {
  timestamps: true
});

var question = mongoose.model('Questions', QuestionSchema)

module.exports = question