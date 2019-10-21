const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  // MongoDB is automatically create ID for every schema so we dont need bookId
  name: String,
  gener: String,
  autherID: String
});

// Book: is the model name and its contains a bookSchema object

module.exports = mongoose.model('Book', bookSchema);
