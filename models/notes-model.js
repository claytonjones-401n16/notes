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
    }
    console.log('Notes:');
    console.log('------')
    allNotes.forEach(item => {
      console.log(`id: ${item._id} - note: '${item.note}'`);
    });
  }

  async update(_id) {

  }

  async delete(_id) {
      try {

        let deletedNote = await this.model.deleteOne({ _id });
        if (deletedNote.deletedCount > 0) console.log(`Deleted ${deletedNote.deletedCount} note(s).`);
        else console.log('ERROR! Note ID not found.');

      } catch(e) {

        console.error('ERROR! Invalid ID.');
        console.error('Search notes using "notes -l" and copy id of note you wish to delete.');
        
      }
  }

}

let NotesModel = new Notes(notesMongooseModel);

module.exports = NotesModel;