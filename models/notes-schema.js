'use strict';

const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
  note: { type: String, required: true },
  category: { type: Array }
});

notesSchema.pre('save', function() {
  console.log('Atempting to save note...');
});

notesSchema.post('save', function() {
  console.log(`Note saved successfully: '${this.note}'`);
})

const notesModel = mongoose.model('notes', notesSchema);

module.exports = notesModel;