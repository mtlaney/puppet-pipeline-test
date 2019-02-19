var mongoose = require('mongoose');

var BaseSchema = mongoose.Schema({
  city: String,
  state: String,
  manager: String,
  acres: String,
  description: String,
  contact: String,
  employees: Number,
  updated_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Base', BaseSchema);
