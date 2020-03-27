'use strict';

const mongoose = require('mongoose');
const notesMongooseModel = require('./notes-schema.js');

class Notes {

  constructor(mongooseModel) {
    this.model = mongooseModel;
  }

  async create(record) {
    try {
      let recordToAdd = new this.model(record);
      return await recordToAdd.save();
    } catch(e) {
      console.log('ERROR CREATING RECORD');
      return false;
    }
  }

  async read(category) {
    let allNotes = await this.model.find();

    if (category) {
      allNotes = allNotes.filter(item => {
        return item.category.includes(category);
      });
      if (allNotes.length < 1) {
        console.log('No notes found matching that category.');
      }
    }
    console.log('Notes:');
    console.log('------')
    allNotes.forEach(item => {
      console.log(`id: ${item._id} - note: '${item.note}'`);
    });

    return allNotes;
    
  }

  async update(_id, newRecord) {
    try {
      let numberModified = await this.model.updateOne({_id}, newRecord);
      return numberModified;

    } catch(e) {
      console.error('ERROR! Could not update record');
      return false;
    }
  }

  async delete(_id) {
      try {

        let deletedNote = await this.model.deleteOne({ _id });
        if (deletedNote.deletedCount > 0) console.log(`Deleted ${deletedNote.deletedCount} note(s).`);
        else console.log('ERROR! Note ID not found.');

        return deletedNote;

      } catch(e) {

        console.error('ERROR! Invalid ID.');
        console.error('Search notes using "notes -l" and copy id of note you wish to delete.');
        return false;
      }
  }

}

let NotesModel = new Notes(notesMongooseModel);

module.exports = NotesModel;