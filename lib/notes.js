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
  async operation(command) {
    mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true } )
    switch(command.action) {
      case 'add':
        return await this.add(command);
        // break;
      case 'list':
        await this.list(command);
        break;
      case 'delete':
        await this.delete(command);
      default:
        break;
    }
  }

  // operation that adds note to the db, includes category if supplied by user
  async add(command) {
    let note = { note: command.payload };
    if (command.category) {
      note.category = [command.category]
    }

    let newNote = await NotesModel.create(note);

    mongoose.disconnect();

    return newNote;
  }

  // lists notes in database, filters by category if user added category input
  async list(command) {

    let allNotes = await NotesModel.read(command.category);

    mongoose.disconnect();

    return allNotes;
  }

  // deletes a single note from the db based on unique id
  async delete(command) {

    let deleted = await NotesModel.delete(command.id);

    mongoose.disconnect();

    return deleted;
  }
}


module.exports = Note;
