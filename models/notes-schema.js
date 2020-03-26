'use strict';

const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
  note: { type: String, required: true },
  category: { type: Array }
});

// --- Pre/Post Hooks ---

  // pre hook for save
  notesSchema.pre('save', function() {
    console.log('Atempting to save note...');
  });

  // post hook for save
  notesSchema.post('save', function() {
    console.log(`Note saved successfully: '${this.note}'`);
  });

  // pre hook for find
  notesSchema.pre('find', function() {
    console.log('Finding notes...');
  });

  // post hook for find
  notesSchema.post('find', function() {
    console.log('Successful search.');
  });

  // pre hook for update
  notesSchema.pre('findAndUpdateOne', function() {
    console.log('Attempting to update note...');
  });

  // post hook for update
  notesSchema.post('findAndUpdateOne', function() {
    console.log('Note successfully updated.');
  });

  // pre hook for delete
  notesSchema.pre('deleteOne', function() {
    console.log('Attempting to delete note...');
  });

  // post hook for delete
  notesSchema.post('deleteOne', function() {
    console.log('Delete successful.');
  })

//      ---------

const notesModel = mongoose.model('notes', notesSchema);

module.exports = notesModel;