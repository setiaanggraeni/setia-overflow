var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerSchema = new Schema({
  answer: String,
  userId: { type: Schema.Types.ObjectId, ref: 'Users' },
  username: String,
  votes: { type: Number, default: 0},
  downvote: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  upvote: [{ type: Schema.Types.ObjectId, ref: 'Users' }]
}, {
  timestamps: true
});

var answers = mongoose.model('Answers', AnswerSchema)

module.exports = answers