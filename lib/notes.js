'use strict';

/**
  * Notes
  * @module notes
  */

/**
  * Note - class
  * @param input
  * @function Note
  */

/**
  * operation - calls a class method based on the action specified
  * @function operation
  */

/**
  * add - will add note to database with optional category
  * @function add
  * @params object
  */

/**
  * list - will display a list of notes, option to filter by category
  * @function list
  * @params object
  */
/**
  * delete - will delete a note in the db based on unique id
  * @function delete
  * @params object
  */

const NotesMongooseModel = require('../models/notes-schema.js');
const mongoose = require('mongoose');
const dbURL = 'mongodb://localhost:27017/app';

const NotesModel = require('../models/notes-model.js');




// Note class, runs validation and acts accordingly
class Note {
  constructor(input) {
    if (input.command.action) {
      this.operation(input.command);
    } else {
      console.error('ERROR! Command not recognized.');
    }
  }

  // executes operation designated by the command action, also connects to db to prep for actions
  operation(command) {
    mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true } )
    switch(command.action) {
      case 'add':
        this.add(command);
        break;
      case 'list':
        this.list(command);
        break;
      case 'delete':
        this.delete(command);
      default:
        break;
    }
  }

  // operation that adds note to the db, includes category if supplied by user
  async add(command) {
    this.note = { note: command.payload };
    if (command.category) {
      this.note.category = [command.category]
    }

    await NotesModel.create(this.note);
    // let noteToSave = new NotesMongooseModel(this.note);
    // try {
    //   await noteToSave.save();
    //   console.log(`Added note: '${this.note.note}'`)
    // } catch(e) {
    //   console.error('ERROR!');
    // }

    mongoose.disconnect();
  }

  // lists notes in database, filters by category if user added category input
  async list(command) {

    await NotesModel.read(command.category);
    // let allNotes = await NotesMongooseModel.find();

    // if (command.category) {
    //   allNotes = allNotes.filter(item => {
    //     return item.category.includes(command.category);
    //   });
    // }
    // console.log('Notes:');
    // console.log('------')
    // allNotes.forEach(item => {
    //   console.log(`id: ${item._id} - note: '${item.note}'`);
    // });

    mongoose.disconnect();
  }

  // deletes a single note from the db based on unique id
  async delete(command) {

    await NotesModel.delete(command.id);
    mongoose.disconnect();
    // if (!command.id) {
    //     console.log('ERROR! Note ID required to delete.');
    //     mongoose.disconnect();
    //   } else {
    //     try {
    //     let deletedNote = await Notes.deleteOne({ _id: command.id });
    //     if (deletedNote.deletedCount > 0) console.log(`Deleted ${deletedNote.deletedCount} note(s).`);
    //     else console.log('ERROR! Note ID not found.');

    //     mongoose.disconnect();
    //   } catch(e) {
    //     console.error(e);
    //     mongoose.disconnect();
    //   }
    // }
  }
}


module.exports = Note;
