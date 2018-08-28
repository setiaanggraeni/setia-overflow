var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate:{
      validator: function(value){
         let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
         return re.test(value);
      }
   },
   unique: true
  },
  password: {
    type: String,
    required: true,
    min: 5
  },
},{
  timestamps: true
});

var user = mongoose.model('Users', UserSchema)

module.exports = user