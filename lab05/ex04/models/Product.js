const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  category: String,
  subcategory: String,
  name: String,
  imageURL: String,
  properties: [String],
});

module.exports = mongoose.model('Product', productSchema);
