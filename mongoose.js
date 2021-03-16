const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const photos = new Schema({
  id: {
    type: Number,
    unique: true,
  }
  url: String,
});

const answers = new Schema({
  id: {
    type: Number,
    unique: true,
  }
  body: String,
  date: String,
  answerer_name: String,
  helpfulness: Number,
  photos: String,
  child: photos
});

const results = new Schema({
  question_id: {
    type: Number,
    unique: true,
  }
  question_body: String,
  question_date: String,
  asker_name: String,
  question_helpfullness: Number,
  reported: Boolean,
  answers: String,
  child: answers
});



const questions = new Schema({
  product_id: {
    type: Number,
    unique: true,
  }
  page: {
    type: Number,
    default: 1
  }
  count: {
    type: Number,
    default: 5
  }
  child: results
});