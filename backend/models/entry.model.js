const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const entrySchema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
}, {
  timestamps: true,
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;