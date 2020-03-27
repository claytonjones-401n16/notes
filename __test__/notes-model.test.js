'use strict';

const supergoose = require('@code-fellows/supergoose');

const NotesModel = require('../models/notes-model.js');

beforeAll(async () => {
  await NotesModel.create({
    note: 'This is a test note for testing.',
    category: ['TESTING']
  });

  await NotesModel.create({
    note: 'Here we have another note for testing.',
    category: []
  });

  await NotesModel.create({
    note: 'Gif is pronounced with a hard G',
    category: ['Facts']
  });
});

describe('Testing NotesModel interface operations', () => {
  it('testing create() with good input', async () => {
    let note = { 
      note: 'mitochondria are the powerhouse of the cell', 
      category: [] 
    };
    let savedNote = await NotesModel.create(note);

    expect(savedNote.note).toStrictEqual('mitochondria are the powerhouse of the cell');
  });

  it('testing create() with bad input', async () => {
    let note = { 
      note: ['note'], 
      category: [] 
    };

    let savedNote = await NotesModel.create(note);
    expect(savedNote).toStrictEqual(false);
  });

  it('testing read() without category', async () => {
    let allNotes = await NotesModel.read();
    expect(allNotes.length).toStrictEqual(4);
  });

  it('tessting read() with category', async() => {
    let allNotes = await NotesModel.read('Facts');
    expect(allNotes[0].note).toStrictEqual('Gif is pronounced with a hard G');
  });

  it('testing update() with good input', async () => {
    let update = {
      note: 'This note was updated',
      category: []
    };

    // every time the tests are run, new IDs are given to the notes,
    // so we need to find the ID of a note in the current DB instance
    let allNotes = await NotesModel.read();
    let _id = allNotes[1]._id;
    
    let numberOfNotesUpdated = await NotesModel.update(_id, update);
    expect(numberOfNotesUpdated.n).toStrictEqual(1);
  });

  it('testing update() with bad input', async () => {
    let update = {
      note: 'This note was updated',
      category: []
    };

    let numberOfNotesUpdated = await NotesModel.update('seven', update);
    expect(numberOfNotesUpdated).toStrictEqual(false);
  });

  it('testing delete() with good input', async () => {
    let allNotes = await NotesModel.read();
    let _id = allNotes[1];

    let deleted = await NotesModel.delete(_id);
    expect(deleted.deletedCount).toStrictEqual(1);
  });

  it('testing delete() with bad input', async () => {
    let deleted = await NotesModel.delete('1');
    expect(deleted).toStrictEqual(false);
  });
});